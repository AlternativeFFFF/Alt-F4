
const legConnectionCoordinates = [
    {x: 98, y: 62},
    {x: 114, y: 84},
    {x: 120, y: 115},
    {x: 98, y: 142},
    {x: 34, y: 62},
    {x: 18, y: 84},
    {x: 13, y: 115},
    {x: 34, y: 142}
];

const legLengthAdjustment = {
    upperLength: 37,
    lowerLength: 72
}

const zOffsets = {
    ground: 0,
    footUp: 20,
    bodyHeight: 110,
    legJoints: 240
};

const restingLegPositions = [
    {x: 120, y: -130},
    {x: 160, y: -50},
    {x: 160, y: 50},
    {x: 120, y: 130},
    {x: -120, y: -130},
    {x: -160, y: -50},
    {x: -160, y: 50},
    {x: -120, y: 130}
];

var framePeriod = 1000 / 60; // 60 fps
var maxSpidertronSpeed = 150; // Pixels per second
var legStepInterval = 80; // ms
var activeLegCount = 2;
var spidertronScale = 0.3;
var stepRandomness = 30;

var spidertrons = [];

// Sort legs by distance from target and alternate closest/furthest
function sortLegOrder(spidertron) {
    spidertron.legs.sort((a, b) => {
        var aDeltaX = spidertron.targetX - a.currentX;
        var aDeltaY = spidertron.targetY - a.currentY;
        var aDistSquared = aDeltaX * aDeltaX + aDeltaY * aDeltaY;
        var bDeltaX = spidertron.targetX - b.currentX;
        var bDeltaY = spidertron.targetY - b.currentY;
        var bDistSquared = bDeltaX * bDeltaX + bDeltaY * bDeltaY;
        return aDistSquared > bDistSquared;
    });
    spidertron.legs = [
        spidertron.legs[0],
        spidertron.legs[7],
        spidertron.legs[1],
        spidertron.legs[6],
        spidertron.legs[2],
        spidertron.legs[5],
        spidertron.legs[3],
        spidertron.legs[4]
    ];
}

function buildSpidertron(baseElement) {
    var spidertron = {
        baseElement: baseElement,
        active: false,
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
        speed: 0,
        activeLeg: 0,
        nextActiveLeg: 0,
        legs: []
    };

     // <div class="spidertron-body-wrapper">
        var spidertronBodyWrapper = document.createElement('div');
        spidertronBodyWrapper.className = 'spidertron-body-wrapper';
        baseElement.appendChild(spidertronBodyWrapper);

        var spidertronBody = document.createElement('div');
        spidertronBody.className = 'spidertron-body';
        spidertronBodyWrapper.appendChild(spidertronBody);

        var spidertronBodyBottom = document.createElement('div');
        spidertronBodyBottom.className = 'spidertron-body-bottom';
        spidertronBodyWrapper.appendChild(spidertronBodyBottom);
    // </div>

    // <div class="spidertron-legN">
    for (var i = 0; i < restingLegPositions.length; i++) {
        var leg = document.createElement('div');
        leg.className = 'spidertron-leg' + (i + 1);
        baseElement.appendChild(leg);

        // <div class="spidertron-leg-upper">
            var legUpper = document.createElement('div');
            legUpper.className = 'spidertron-leg-upper';
            leg.appendChild(legUpper);
    
            var legUpperEndA = document.createElement('div');
            legUpperEndA.className = 'spidertron-leg-upper-end-a';
            legUpper.appendChild(legUpperEndA);
    
            var legUpperStretchable = document.createElement('div');
            legUpperStretchable.className = 'spidertron-leg-upper-stretchable';
            legUpper.appendChild(legUpperStretchable);
    
            var legUpperEndB = document.createElement('div');
            legUpperEndB.className = 'spidertron-leg-upper-end-b';
            legUpper.appendChild(legUpperEndB);

            var legKnee = document.createElement('div');
            legKnee.className = 'spidertron-leg-knee';
            legUpper.appendChild(legKnee);

            var lowerLegWrapper = document.createElement('div');
            lowerLegWrapper.className = 'spidertron-leg-lower-wrapper';
            legUpper.appendChild(lowerLegWrapper);
    
            // <div class="spidertron-leg-lower">
                var legLower = document.createElement('div');
                legLower.className = 'spidertron-leg-lower';
                lowerLegWrapper.appendChild(legLower);
        
                var legLowerEndA = document.createElement('div');
                legLowerEndA.className = 'spidertron-leg-lower-end-a';
                legLower.appendChild(legLowerEndA);
        
                var legLowerStretchable = document.createElement('div');
                legLowerStretchable.className = 'spidertron-leg-lower-stretchable';
                legLower.appendChild(legLowerStretchable);
        
                var legLowerEndB = document.createElement('div');
                legLowerEndB.className = 'spidertron-leg-lower-end-b';
                legLower.appendChild(legLowerEndB);
            // </div>
        // </div>

        var legX = restingLegPositions[i].x * spidertronScale + legConnectionCoordinates[i].x + spidertron.currentX;
        var legY = restingLegPositions[i].y * spidertronScale + legConnectionCoordinates[i].y + spidertron.currentY;
        spidertron.legs.push({
            index: i,
            active: false,
            stepTime: 0,
            stepHeight: 0,
            currentX: legX,
            currentY: legY,
            targetX: legX,
            targetY: legY,
            upperElement: legUpper,
            lowerElement: legLower,
            kneeElement: legKnee
        });
    }

    return spidertron;
}

function updateSpidertron(spidertron, time) {
    var targetDeltaX = spidertron.targetX - spidertron.currentX;
    var targetDeltaY = spidertron.targetY - spidertron.currentY;

    // Calculate spidertron speed with an ease-in-out transition
    var targetDistance = Math.round(Math.sqrt(targetDeltaX * targetDeltaX + targetDeltaY * targetDeltaY));
    if (targetDistance > spidertron.speed) {
        spidertron.speed += maxSpidertronSpeed / framePeriod;
    } else {
        spidertron.speed = targetDistance;
    }
    spidertron.speed = Math.max(0, Math.min(spidertron.speed, maxSpidertronSpeed));

    // Move spidertron towards target
    var spidertronDeltaX = 0;
    var spidertronDeltaY = 0;
    if (targetDistance > 0) {
        spidertronDeltaX = targetDeltaX / targetDistance * spidertron.speed / framePeriod;
        spidertronDeltaY = targetDeltaY / targetDistance * spidertron.speed / framePeriod;
        if (Math.abs(spidertronDeltaX) > Math.abs(targetDeltaX)) {
            spidertronDeltaX = targetDeltaX;
        }
        if (Math.abs(spidertronDeltaY) > Math.abs(targetDeltaY)) {
            spidertronDeltaY = targetDeltaY;
        }
        spidertron.currentX += spidertronDeltaX;
        spidertron.currentY += spidertronDeltaY;
    }

    // Update leg target positions
    if (time >= spidertron.nextActiveLeg) {
        spidertron.activeLeg++;
        if (spidertron.activeLeg >= spidertron.legs.length) {
            spidertron.activeLeg = 0;
        }

        spidertron.nextActiveLeg = time + legStepInterval / activeLegCount
        var i = spidertron.activeLeg;

        spidertron.legs[i].active = true;
        spidertron.legs[i].stepTime = time;

        var N = spidertron.legs[i].index;
        if (targetDistance >= maxSpidertronSpeed * spidertronScale) {
            spidertron.legs[i].targetX = restingLegPositions[N].x * spidertronScale + legConnectionCoordinates[N].x + spidertron.currentX;
            spidertron.legs[i].targetY = restingLegPositions[N].y * spidertronScale + legConnectionCoordinates[N].y + spidertron.currentY;
            // Add extrapolated spidertron position
            var msUntilNextStep = legStepInterval / activeLegCount * spidertron.legs.length;
            spidertron.legs[i].targetX += spidertronDeltaX * msUntilNextStep / framePeriod / 2;
            spidertron.legs[i].targetY += spidertronDeltaY * msUntilNextStep / framePeriod / 2;
            // Add some randomness
            spidertron.legs[i].targetX += Math.random() * stepRandomness * spidertronScale;
            spidertron.legs[i].targetY += Math.random() * stepRandomness * spidertronScale;
        } else {
            spidertron.legs[i].targetX = restingLegPositions[N].x * spidertronScale + legConnectionCoordinates[N].x + spidertron.targetX;
            spidertron.legs[i].targetY = restingLegPositions[N].y * spidertronScale + legConnectionCoordinates[N].y + spidertron.targetY;
        }
    }

    for (var i = 0; i < spidertron.legs.length; i++) {
        if (spidertron.legs[i].active) {
            var legDeltaX = spidertron.legs[i].targetX - spidertron.legs[i].currentX;
            var legDeltaY = spidertron.legs[i].targetY - spidertron.legs[i].currentY;
            if ((legDeltaX * legDeltaX + legDeltaY * legDeltaY) > 10) {
                var remainingTime = Math.max(0, spidertron.legs[i].stepTime + legStepInterval - time);
                if (remainingTime > framePeriod) {
                    spidertron.legs[i].currentX += legDeltaX * framePeriod / remainingTime;
                    spidertron.legs[i].currentY += legDeltaY * framePeriod / remainingTime;
                } else {
                    spidertron.legs[i].currentX = spidertron.legs[i].targetX;
                    spidertron.legs[i].currentY = spidertron.legs[i].targetY;
                    spidertron.legs[i].active = false;
                }
            } else {
                spidertron.legs[i].active = false;
            }
        }
    }

    // Update sprites
    spidertron.baseElement.style.setProperty('--spidertron-location-x', spidertron.currentX + 'px');
    spidertron.baseElement.style.setProperty('--spidertron-location-y', spidertron.currentY + 'px');

    var bodyHeight = zOffsets.bodyHeight + Math.sin(time / 130) * 4;
    spidertron.baseElement.style.setProperty('--spidertron-body-height', (-bodyHeight) + 'px');
    spidertron.baseElement.style.setProperty('--spidertron-scale', spidertronScale);

    for (var i = 0; i < spidertron.legs.length; i++) {
        var N = spidertron.legs[i].index;

        var deltaX = (spidertron.legs[i].currentX - legConnectionCoordinates[N].x - spidertron.currentX) / spidertronScale;
        var deltaY = (spidertron.legs[i].currentY - legConnectionCoordinates[N].y - spidertron.currentY) / spidertronScale + bodyHeight;
        if (spidertron.legs[i].active) {
            deltaY -= zOffsets.footUp;
        }
        var upperDeltaX = deltaX / 2;
        var upperDeltaY = deltaY / 2 - (zOffsets.legJoints - zOffsets.bodyHeight);
        var upperLength = Math.sqrt(upperDeltaX * upperDeltaX + upperDeltaY * upperDeltaY);
        var upperAngle = Math.atan2(-upperDeltaX, upperDeltaY);

        var lowerDeltaX = deltaX - upperDeltaX;
        var lowerDeltaY = deltaY - upperDeltaY;
        var lowerLength = Math.sqrt(lowerDeltaX * lowerDeltaX + lowerDeltaY * lowerDeltaY);
        var lowerAngle = Math.atan2(-lowerDeltaX, lowerDeltaY);

        spidertron.legs[i].upperElement.style.setProperty('--leg-upper-angle', upperAngle + 'rad');
        spidertron.legs[i].upperElement.style.setProperty('--leg-upper-length', Math.max(0, upperLength - legLengthAdjustment.upperLength) + 'px');

        spidertron.legs[i].lowerElement.style.setProperty('--leg-lower-angle', (lowerAngle - upperAngle) + 'rad');
        spidertron.legs[i].lowerElement.style.setProperty('--leg-lower-length', Math.max(0, lowerLength - legLengthAdjustment.lowerLength) + 'px');

        spidertron.legs[i].kneeElement.style.setProperty('--knee-angle', -((lowerAngle + upperAngle) / 2) + 'rad');
    }
}

function spidertronAnimationCallback(time) {
    for (var i = 0; i < spidertrons.length; i++) {
        updateSpidertron(spidertrons[i], time);
    }

    window.requestAnimationFrame(spidertronAnimationCallback);
}

var selectedSpidertron = null;

window.onload = function() {
    var maskElement = document.createElement('div');
    maskElement.className = 'spidertron-active-mask';

    var spidertronElements = document.getElementsByClassName('spidertron');
    for (var i = 0; i < spidertronElements.length; i++) {
        var spidertron = buildSpidertron(spidertronElements[i]);
        updateSpidertron(spidertron, 0);
        spidertrons.push(spidertron);

        spidertronElements[i].addEventListener('click', function(e) {
            spidertron.active = !spidertron.active;
            if (!spidertron.active) {
                spidertron.targetX = 0;
                spidertron.targetY = 0;
                selectedSpidertron = null;
                document.body.removeChild(maskElement);
            } else {
                spidertron.targetX = spidertron.currentX;
                spidertron.targetY = spidertron.currentY;
                selectedSpidertron = spidertron;
                document.body.appendChild(maskElement);
            }
            e.preventDefault();
        });
    }

    window.requestAnimationFrame(spidertronAnimationCallback);

    maskElement.addEventListener('click', function(e) {
        if (selectedSpidertron != null) {
            var spidertronRect = selectedSpidertron.baseElement.getBoundingClientRect();
            selectedSpidertron.targetX = e.clientX - spidertronRect.left + selectedSpidertron.currentX;
            selectedSpidertron.targetY = e.clientY - spidertronRect.top + selectedSpidertron.currentY;
            sortLegOrder(selectedSpidertron);
            e.preventDefault();
        }
    });
}

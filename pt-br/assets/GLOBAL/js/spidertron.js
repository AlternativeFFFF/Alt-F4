/*
The "Spidertron" name and associated images are part of the Factorio game and
are property of Wube Software. The application of this software using the
Spidertron name and image files requires separate permission from Wube Software.

This file, excluding the Spidertron name and images, is subject to the following license:

MIT License

Copyright (c) 2020 Jacob Wirth (xthexder)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const legConnectionCoordinates = [
    {x: 16, y: -49},
    {x: 24, y: -38},
    {x: 27, y: -23},
    {x: 16, y: -9},
    {x: -16, y: -49},
    {x: -24, y: -38},
    {x: -27, y: -23},
    {x: -16, y: -9}
];

const zOffsets = {
    ground: 0,
    footUp: 5,
    bodyHeight: 35,
    legJoints: 105
};

const restingLegPositions = [
    {x: 75, y: -90},
    {x: 100, y: -35},
    {x: 100, y: 35},
    {x: 75, y: 90},
    {x: -75, y: -90},
    {x: -100, y: -35},
    {x: -100, y: 35},
    {x: -75, y: 90}
];

const maxSpidertronSpeed = 400; // Pixels per second
const legStepInterval = 100; // ms
const activeLegCount = 3;
const stepRandomness = 20;
const boundingBoxPadding = 5;

var spidertrons = [];

function buildSpidertron(homeElement) {
    let spidertronBase = document.createElement('div');
    spidertronBase.className = 'spidertron';

    let homeRect = homeElement.getBoundingClientRect();
    let bodyRect = document.body.getBoundingClientRect();

    let homeX = homeRect.x - bodyRect.x;
    let homeY = homeRect.y - bodyRect.y;

    let spidertron = {
        homeElement: homeElement,
        homeX: homeX,
        homeY: homeY,
        baseElement: spidertronBase,
        idle: true,
        lastUpdate: 0,
        moveStartTime: 0,
        moveDuration: 0,
        startX: homeX,
        startY: homeY,
        currentX: homeX,
        currentY: homeY,
        targetX: homeX,
        targetY: homeY,
        boundingBox: {x: 0, y: 0, width: 0, height: 0},
        scale: homeElement.dataset.spidertronScale || 1.0,
        maxSpeed: homeElement.dataset.spidertronSpeed || maxSpidertronSpeed,
        activeLeg: 0,
        nextActiveLeg: 0,
        legs: []
    };

    let spidertronBody = document.createElement('div');
    spidertronBody.className = 'spidertron-body';

    const orderBackToFront = [ // -1 for body
        0, 4, 1, 5, -1, 2, 6, 3, 7
    ];

    for (let i = 0; i < orderBackToFront.length; i++) {
        let N = orderBackToFront[i];
        if (N == -1) {
            spidertronBase.appendChild(spidertronBody);
            continue;
        }

        // <div class="spidertron-legN-lower-wrapper spidertron-leg-wrapper">
        let legLowerWrapper = document.createElement('div');
        legLowerWrapper.className = 'spidertron-leg' + (N + 1) + '-lower-wrapper spidertron-leg-wrapper';
        spidertronBase.appendChild(legLowerWrapper);

        // <div class="spidertron-legN-lower spidertron-leg-lower">
        let legLower = document.createElement('div');
        legLower.className = 'spidertron-leg' + (N + 1) + '-lower spidertron-leg-lower';
        legLowerWrapper.appendChild(legLower);

        let legLowerStretchable = document.createElement('div');
        legLowerStretchable.className = 'spidertron-leg-lower-stretchable';
        legLower.appendChild(legLowerStretchable);

        let legLowerEndB = document.createElement('div');
        legLowerEndB.className = 'spidertron-leg-lower-end-b';
        legLower.appendChild(legLowerEndB);
        
        let legLowerEndA = document.createElement('div');
        legLowerEndA.className = 'spidertron-leg-lower-end-a';
        legLower.appendChild(legLowerEndA);
        // </div>
        // </div>

        // <div class="spidertron-legN-upper-wrapper spidertron-leg-wrapper">
        let legUpperWrapper = document.createElement('div');
        legUpperWrapper.className = 'spidertron-leg' + (N + 1) + '-upper-wrapper spidertron-leg-wrapper';
        spidertronBase.appendChild(legUpperWrapper);

        // <div class="spidertron-legN-upper spidertron-leg-upper">
        let legUpper = document.createElement('div');
        legUpper.className = 'spidertron-leg' + (N + 1) + '-upper spidertron-leg-upper';
        legUpperWrapper.appendChild(legUpper);

        let legUpperStretchable = document.createElement('div');
        legUpperStretchable.className = 'spidertron-leg-upper-stretchable';
        legUpper.appendChild(legUpperStretchable);

        let legUpperEndB = document.createElement('div');
        legUpperEndB.className = 'spidertron-leg-upper-end-b';
        legUpper.appendChild(legUpperEndB);
    
        let legUpperEndA = document.createElement('div');
        legUpperEndA.className = 'spidertron-leg-upper-end-a';
        legUpper.appendChild(legUpperEndA);

        // <div class="spidertron-legN-knee spidertron-leg-knee">
        let legKnee = document.createElement('div');
        legKnee.className = 'spidertron-leg' + (N + 1) + '-knee spidertron-leg-knee';
        legUpper.appendChild(legKnee);
        // </div>
        // </div>
        // </div>

        let legX = restingLegPositions[N].x * spidertron.scale + spidertron.currentX;
        let legY = restingLegPositions[N].y * spidertron.scale + spidertron.currentY;
        spidertron.legs.push({
            index: N,
            active: false,
            stepStartTime: 0,
            startX: legX,
            startY: legY,
            currentX: legX,
            currentY: legY,
            targetX: legX,
            targetY: legY,
            upperElement: legUpper,
            lowerElement: legLower,
            kneeElement: legKnee
        });
    }

    document.body.appendChild(spidertronBase);

    return spidertron;
}

function setSpidertronTarget(spidertron, targetX, targetY) {
    spidertron.startX = spidertron.currentX;
    spidertron.startY = spidertron.currentY;
    spidertron.targetX = targetX;
    spidertron.targetY = targetY;

    var targetDeltaX = spidertron.targetX - spidertron.currentX;
    var targetDeltaY = spidertron.targetY - spidertron.currentY;
    let targetDistance = Math.sqrt(targetDeltaX * targetDeltaX + targetDeltaY * targetDeltaY);

    spidertron.moveStartTime = spidertron.lastUpdate;
    spidertron.moveDuration = targetDistance / spidertron.maxSpeed * 1000;
    spidertron.idle = false;

    // Stop any current leg movement before changing direction.
    for (let i = 0; i < spidertron.legs.length; i++) {
        spidertron.legs[i].targetX = spidertron.legs[i].currentX;
        spidertron.legs[i].targetY = spidertron.legs[i].currentY;
    }

    // Sort legs by their distance from axis of movement
    spidertron.legs.sort((a, b) => {
        let aDeltaX = spidertron.targetX - a.currentX;
        let aDeltaY = spidertron.targetY - a.currentY;
        let aDist = Math.sqrt(aDeltaX * aDeltaX + aDeltaY * aDeltaY);

        let aDotCenter = aDeltaX * targetDeltaX + aDeltaY * targetDeltaY;

        let bDeltaX = spidertron.targetX - b.currentX;
        let bDeltaY = spidertron.targetY - b.currentY;
        let bDist = Math.sqrt(bDeltaX * bDeltaX + bDeltaY * bDeltaY);

        let bDotCenter = bDeltaX * targetDeltaX + bDeltaY * targetDeltaY;

        return aDotCenter / aDist < bDotCenter / bDist;
    });
}

// Used when home moves on the page
function teleportSpidertron(spidertron, deltaX, deltaY) {
    spidertron.startX += deltaX;
    spidertron.startY += deltaY;
    spidertron.currentX += deltaX;
    spidertron.currentY += deltaY;
    spidertron.targetX += deltaX;
    spidertron.targetY += deltaY;

    for (let i = 0; i < spidertron.legs.length; i++) {
        spidertron.legs[i].startX += deltaX;
        spidertron.legs[i].startY += deltaY;
        spidertron.legs[i].currentX += deltaX;
        spidertron.legs[i].currentY += deltaY;
        spidertron.legs[i].targetX += deltaX;
        spidertron.legs[i].targetY += deltaY;
    }
}

function isSpidertronVisible(spidertron) {
    let spidertronMinY = spidertron.boundingBox.y + spidertron.currentY;
    if (spidertronMinY > window.pageYOffset + window.innerHeight) {
        // Spidertron off bottom of screen
        return false;
    } else if (spidertronMinY + spidertron.boundingBox.height < window.pageYOffset) {
        // Spidertron off top of screen
        return false;
    }
    // Spidertron visible
    return true;
}

function updateSpidertron(spidertron, time) {
    let homeRect = spidertron.homeElement.getBoundingClientRect();
    let bodyRect = document.body.getBoundingClientRect();
    let homeX = homeRect.x - bodyRect.x;
    let homeY = homeRect.y - bodyRect.y;

    // Move spidertron towards target
    if (spidertron.moveDuration > 0 && !spidertron.idle) {
        // Check if the home moved, and update the target position.
        if (homeX != spidertron.homeX || homeY != spidertron.homeY) {
            spidertron.targetX += homeX - spidertron.homeX;
            spidertron.targetY += homeY - spidertron.homeY;
        }

        let elapsedRatio = Math.min(1, Math.max(0, (time - spidertron.moveStartTime) / spidertron.moveDuration));
        spidertron.currentX = spidertron.startX + (spidertron.targetX - spidertron.startX) * elapsedRatio;
        spidertron.currentY = spidertron.startY + (spidertron.targetY - spidertron.startY) * elapsedRatio;
        spidertron.idle = elapsedRatio >= 1;

        // Activate the next leg and set a new target position
        if (time >= spidertron.nextActiveLeg) {
            spidertron.activeLeg++;
            if (spidertron.activeLeg >= spidertron.legs.length) {
                spidertron.activeLeg = 0;
            }

            spidertron.nextActiveLeg = time + legStepInterval / activeLegCount
            let i = spidertron.activeLeg;
            let N = spidertron.legs[i].index;

            // Predict where spidertron will be at the next start of the next step
            let msUntilNextStep = legStepInterval / activeLegCount * spidertron.legs.length;
            let predictedElapsedRatio = Math.min(1, Math.max(0, (time + msUntilNextStep - spidertron.moveStartTime) / spidertron.moveDuration));
            let predictedX = spidertron.startX + (spidertron.targetX - spidertron.startX) * predictedElapsedRatio;
            let predictedY = spidertron.startY + (spidertron.targetY - spidertron.startY) * predictedElapsedRatio;

            spidertron.legs[i].stepStartTime = time;
            spidertron.legs[i].startX = spidertron.legs[i].currentX;
            spidertron.legs[i].startY = spidertron.legs[i].currentY;
            if (predictedElapsedRatio < 1) {
                spidertron.legs[i].targetX = restingLegPositions[N].x * spidertron.scale + predictedX;
                spidertron.legs[i].targetY = restingLegPositions[N].y * spidertron.scale + predictedY;
                // Add some randomness
                spidertron.legs[i].targetX += Math.random() * stepRandomness * spidertron.scale;
                spidertron.legs[i].targetY += Math.random() * stepRandomness * spidertron.scale;
            } else {
                spidertron.legs[i].targetX = restingLegPositions[N].x * spidertron.scale + spidertron.targetX;
                spidertron.legs[i].targetY = restingLegPositions[N].y * spidertron.scale + spidertron.targetY;
            }

            if (spidertron.legs[i].currentX != spidertron.legs[i].targetX || spidertron.legs[i].currentY != spidertron.legs[i].targetY) {
                spidertron.legs[i].active = true;
            }
        }

        // Advance active legs toward targets
        for (let i = 0; i < spidertron.legs.length; i++) {
            if (spidertron.legs[i].active) {
                let stepElapsedRatio = Math.min(1, Math.max(0, (time - spidertron.legs[i].stepStartTime) / legStepInterval));
                if (stepElapsedRatio < 1) {
                    spidertron.legs[i].currentX = spidertron.legs[i].startX + (spidertron.legs[i].targetX - spidertron.legs[i].startX) * stepElapsedRatio;
                    spidertron.legs[i].currentY = spidertron.legs[i].startY + (spidertron.legs[i].targetY - spidertron.legs[i].startY) * stepElapsedRatio;
                    spidertron.idle = false;
                } else {
                    spidertron.legs[i].currentX = spidertron.legs[i].targetX;
                    spidertron.legs[i].currentY = spidertron.legs[i].targetY;
                    spidertron.legs[i].active = false;
                }
            }
        }
    } else if (time > 0 && spidertron.idle) {
        // Check if the home moved, and teleport the spidertron if it did.
        if (homeX != spidertron.homeX || homeY != spidertron.homeY) {
            teleportSpidertron(spidertron, homeX - spidertron.homeX, homeY - spidertron.homeY);
        } else if (!isSpidertronVisible(spidertron)) {
            // Skip updating spidertron's idle if it is off screen.
            spidertron.lastUpdate = time;
            return;
        }
    }
    spidertron.homeX = homeX;
    spidertron.homeY = homeY;

    // Update CSS layout
    let bodyHeight = zOffsets.bodyHeight + Math.sin(time / 130) * 2;
    let cssText = '--spidertron-scale:' + spidertron.scale + ';';

    // Caculate a bounding box for spidertron
    let minX = -33 * spidertron.scale;
    let minY = (-bodyHeight - 80) * spidertron.scale;
    let maxX = 33 * spidertron.scale;
    let maxY = -bodyHeight * spidertron.scale;
    let averageX = 0;
    let averageY = 0;
    for (let i = 0; i < spidertron.legs.length; i++) {
        minX = Math.min(spidertron.legs[i].currentX - spidertron.currentX, minX);
        minY = Math.min(spidertron.legs[i].currentY - spidertron.currentY - (zOffsets.legJoints - zOffsets.bodyHeight) * spidertron.scale, minY);
        maxX = Math.max(spidertron.legs[i].currentX - spidertron.currentX, maxX);
        maxY = Math.max(spidertron.legs[i].currentY - spidertron.currentY, maxY);
        averageX += spidertron.legs[i].currentX;
        averageY += spidertron.legs[i].currentY;
    }
    averageX /= spidertron.legs.length;
    averageY /= spidertron.legs.length;
    spidertron.boundingBox = {
        x: minX - boundingBoxPadding,
        y: minY - boundingBoxPadding,
        width: maxX - minX + boundingBoxPadding * 2,
        height: maxY - minY + boundingBoxPadding * 2
    };

    let bodyOffsetX = averageX - spidertron.currentX;
    let bodyOffsetY = averageY - spidertron.currentY;
    for (let i = 0; i < spidertron.legs.length; i++) {
        let N = spidertron.legs[i].index;
        let deltaX = (spidertron.legs[i].currentX - averageX) / spidertron.scale - legConnectionCoordinates[N].x;
        let deltaY = (spidertron.legs[i].currentY - averageY) / spidertron.scale - legConnectionCoordinates[N].y + bodyHeight;
        if (spidertron.legs[i].active) {
            deltaY -= zOffsets.footUp;
        }

        let upperDeltaX = deltaX / 2;
        let upperDeltaY = deltaY / 2 - (zOffsets.legJoints - zOffsets.bodyHeight);
        let upperLength = Math.sqrt(upperDeltaX * upperDeltaX + upperDeltaY * upperDeltaY);
        let upperAngle = Math.atan2(-upperDeltaX, upperDeltaY);

        cssText += '--leg' + (N + 1) + '-upper-location-x:' + ((bodyOffsetX - spidertron.boundingBox.x) / spidertron.scale + legConnectionCoordinates[N].x) + 'px;' +
                   '--leg' + (N + 1) + '-upper-location-y:' + ((bodyOffsetY - spidertron.boundingBox.y) / spidertron.scale + legConnectionCoordinates[N].y - bodyHeight) + 'px;' +
                   '--leg' + (N + 1) + '-upper-angle:' + upperAngle + 'rad;' +
                   '--leg' + (N + 1) + '-upper-length:' + upperLength + 'px;';

        let lowerDeltaX = deltaX - upperDeltaX;
        let lowerDeltaY = deltaY - upperDeltaY;
        let lowerLength = Math.sqrt(lowerDeltaX * lowerDeltaX + lowerDeltaY * lowerDeltaY);
        let lowerAngle = Math.atan2(-lowerDeltaX, lowerDeltaY);

        let lowerPositionX = (spidertron.legs[i].currentX - spidertron.currentX - spidertron.boundingBox.x) / spidertron.scale;
        let lowerPositionY = (spidertron.legs[i].currentY - spidertron.currentY - spidertron.boundingBox.y) / spidertron.scale;
        if (spidertron.legs[i].active) {
            lowerPositionY -= zOffsets.footUp;
        }

        cssText += '--leg' + (N + 1) + '-lower-location-x:' + lowerPositionX + 'px;' +
                   '--leg' + (N + 1) + '-lower-location-y:' + lowerPositionY + 'px;' +
                   '--leg' + (N + 1) + '-lower-angle:' + (lowerAngle + Math.PI) + 'rad;' +
                   '--leg' + (N + 1) + '-lower-length:' + lowerLength + 'px;' +
                   '--leg' + (N + 1) + '-knee-angle:' + -((lowerAngle + upperAngle) / 2) + 'rad;';
    }

    // Crop spidertron if it goes outside the document body so that it doesn't cause page resizes.
    let locationX = Math.min(bodyRect.width, spidertron.currentX + spidertron.boundingBox.x);
    let locationY = Math.min(bodyRect.height, spidertron.currentY + spidertron.boundingBox.y);
    let scaledWidth = Math.max(0, Math.min(bodyRect.width - locationX, spidertron.boundingBox.width)) / spidertron.scale;
    let scaledHeight = Math.max(0, Math.min(bodyRect.height - locationY, spidertron.boundingBox.height)) / spidertron.scale;

    cssText += '--spidertron-location-x:' + locationX + 'px;' +
               '--spidertron-location-y:' + locationY + 'px;' +
               '--spidertron-width:' + scaledWidth + 'px;' +
               '--spidertron-height:' + scaledHeight + 'px;' +
               '--spidertron-body-x:' + (bodyOffsetX - spidertron.boundingBox.x) / spidertron.scale + 'px;' +
               '--spidertron-body-y:' + ((bodyOffsetY - spidertron.boundingBox.y) / spidertron.scale - bodyHeight) + 'px;';

    spidertron.baseElement.style.cssText = cssText;
    spidertron.lastUpdate = time;
}

function spidertronAnimationCallback(time) {
    for (let i = 0; i < spidertrons.length; i++) {
        updateSpidertron(spidertrons[i], time);
    }

    window.requestAnimationFrame(spidertronAnimationCallback);
}

let selectedSpidertron = null;

window.onload = function() {
    let maskElement = document.createElement('div');
    maskElement.className = 'spidertron-active-mask';

    let spidertronHomeElements = document.getElementsByClassName('spidertron-home');
    for (let i = 0; i < spidertronHomeElements.length; i++) {
        let spidertron = buildSpidertron(spidertronHomeElements[i]);
        spidertron.baseElement.dataset.spidertronIndex = spidertrons.length;
        updateSpidertron(spidertron, 0);
        spidertrons.push(spidertron);

        spidertron.baseElement.addEventListener('click', function(e) {
            let targetSpidertron = spidertrons[e.currentTarget.dataset.spidertronIndex];
            if (selectedSpidertron == targetSpidertron) {
                let homeRect = selectedSpidertron.homeElement.getBoundingClientRect();
                let bodyRect = document.body.getBoundingClientRect();
                setSpidertronTarget(selectedSpidertron, homeRect.x - bodyRect.x, homeRect.y - bodyRect.y);
                selectedSpidertron = null;
                document.body.removeChild(maskElement);
            } else {
                selectedSpidertron = targetSpidertron;
                document.body.appendChild(maskElement);
            }
            e.preventDefault();
        });
    }

    window.requestAnimationFrame(spidertronAnimationCallback);

    maskElement.addEventListener('click', function(e) {
        if (selectedSpidertron != null) {
            setSpidertronTarget(selectedSpidertron, e.pageX, e.pageY);
            e.preventDefault();
        }
    });
}

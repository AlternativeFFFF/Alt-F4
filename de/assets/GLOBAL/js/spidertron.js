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
    {x: 49, y: 31},
    {x: 57, y: 42},
    {x: 60, y: 57},
    {x: 49, y: 71},
    {x: 17, y: 31},
    {x: 9, y: 42},
    {x: 6, y: 57},
    {x: 17, y: 71}
];

const zOffsets = {
    ground: 0,
    footUp: 10,
    bodyHeight: 55,
    legJoints: 120
};

const restingLegPositions = [
    {x: 60, y: -65},
    {x: 80, y: -25},
    {x: 80, y: 25},
    {x: 60, y: 65},
    {x: -60, y: -65},
    {x: -80, y: -25},
    {x: -80, y: 25},
    {x: -60, y: 65}
];

const framePeriod = 1000 / 60; // 60 fps
const maxSpidertronSpeed = 100; // Pixels per second
const legStepInterval = 100; // ms
const activeLegCount = 3;
const stepRandomness = 20;

var spidertrons = [];

// Sort legs by distance from target and alternate closest/furthest
function sortLegOrder(spidertron) {
    spidertron.legs.sort((a, b) => {
        let aDeltaX = spidertron.targetX - a.currentX;
        let aDeltaY = spidertron.targetY - a.currentY;

        let aDistSquared = aDeltaX * aDeltaX + aDeltaY * aDeltaY;

        let bDeltaX = spidertron.targetX - b.currentX;
        let bDeltaY = spidertron.targetY - b.currentY;

        let bDistSquared = bDeltaX * bDeltaX + bDeltaY * bDeltaY;

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

    // Reset active leg so the next iteration starts with the right leg
    spidertron.activeLeg = spidertron.legs.length - 1;
}

function buildSpidertron(baseElement) {
    let spidertron = {
        baseElement: baseElement,
        active: false,
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
        scale: baseElement.dataset.spidertronScale || 1.0,
        speed: 0,
        maxSpeed: baseElement.dataset.spidertronSpeed || maxSpidertronSpeed,
        activeLeg: 0,
        nextActiveLeg: 0,
        legs: []
    };

    let spidertronBody = document.createElement('div');
    spidertronBody.className = 'spidertron-body';
    baseElement.appendChild(spidertronBody);

    // <div class="spidertron-legN">
    for (let i = 0; i < restingLegPositions.length; i++) {
        let leg = document.createElement('div');
        leg.className = 'spidertron-leg' + (i + 1);
        baseElement.appendChild(leg);
	
        // <div class="spidertron-leg-upper">
            let legUpper = document.createElement('div');
            legUpper.className = 'spidertron-leg-upper';
            leg.appendChild(legUpper);
    
            let legUpperEndA = document.createElement('div');
            legUpperEndA.className = 'spidertron-leg-upper-end-a';
            legUpper.appendChild(legUpperEndA);
    
            let legUpperStretchable = document.createElement('div');
            legUpperStretchable.className = 'spidertron-leg-upper-stretchable';
            legUpper.appendChild(legUpperStretchable);
    
            let legUpperEndB = document.createElement('div');
            legUpperEndB.className = 'spidertron-leg-upper-end-b';
            legUpper.appendChild(legUpperEndB);

            let legKnee = document.createElement('div');
            legKnee.className = 'spidertron-leg-knee';
            legUpper.appendChild(legKnee);

            let lowerLegWrapper = document.createElement('div');
            lowerLegWrapper.className = 'spidertron-leg-lower-wrapper';
            legUpper.appendChild(lowerLegWrapper);
    
            // <div class="spidertron-leg-lower">
                let legLower = document.createElement('div');
                legLower.className = 'spidertron-leg-lower';
                lowerLegWrapper.appendChild(legLower);
        
                let legLowerEndA = document.createElement('div');
                legLowerEndA.className = 'spidertron-leg-lower-end-a';
                legLower.appendChild(legLowerEndA);
        
                let legLowerStretchable = document.createElement('div');
                legLowerStretchable.className = 'spidertron-leg-lower-stretchable';
                legLower.appendChild(legLowerStretchable);
        
                let legLowerEndB = document.createElement('div');
                legLowerEndB.className = 'spidertron-leg-lower-end-b';
                legLower.appendChild(legLowerEndB);
            // </div>
        // </div>

        let legX = restingLegPositions[i].x * spidertron.scale + legConnectionCoordinates[i].x + spidertron.currentX;
        let legY = restingLegPositions[i].y * spidertron.scale + legConnectionCoordinates[i].y + spidertron.currentY;
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
    let targetDeltaX = spidertron.targetX - spidertron.currentX;
    let targetDeltaY = spidertron.targetY - spidertron.currentY;

    // Calculate spidertron speed with an ease-in-out transition
    let targetDistance = Math.round(Math.sqrt(targetDeltaX * targetDeltaX + targetDeltaY * targetDeltaY));
    if (targetDistance > spidertron.speed) {
        spidertron.speed += spidertron.maxSpeed / framePeriod;
    } else {
        spidertron.speed = targetDistance;
    }
    spidertron.speed = Math.max(0, Math.min(spidertron.speed, spidertron.maxSpeed));

    // Move spidertron towards target
    let spidertronDeltaX = 0;
    let spidertronDeltaY = 0;
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
        let i = spidertron.activeLeg;

        spidertron.legs[i].active = true;
        spidertron.legs[i].stepTime = time;

        let N = spidertron.legs[i].index;
        if (targetDistance >= spidertron.maxSpeed * spidertron.scale) {
            spidertron.legs[i].targetX = restingLegPositions[N].x * spidertron.scale + legConnectionCoordinates[N].x + spidertron.currentX;
            spidertron.legs[i].targetY = restingLegPositions[N].y * spidertron.scale + legConnectionCoordinates[N].y + spidertron.currentY;
            // Add extrapolated spidertron position
            let msUntilNextStep = legStepInterval / activeLegCount * spidertron.legs.length;
            let deltaScale = (targetDistance > spidertron.speed ? spidertron.maxSpeed : spidertron.speed) / framePeriod / targetDistance / 2;
            spidertron.legs[i].targetX += targetDeltaX * deltaScale * msUntilNextStep / framePeriod;
            spidertron.legs[i].targetY += targetDeltaY * deltaScale * msUntilNextStep / framePeriod;
            // Add some randomness
            spidertron.legs[i].targetX += Math.random() * stepRandomness * spidertron.scale;
            spidertron.legs[i].targetY += Math.random() * stepRandomness * spidertron.scale;
        } else {
            spidertron.legs[i].targetX = restingLegPositions[N].x * spidertron.scale + legConnectionCoordinates[N].x + spidertron.targetX;
            spidertron.legs[i].targetY = restingLegPositions[N].y * spidertron.scale + legConnectionCoordinates[N].y + spidertron.targetY;
        }
    }

    for (let i = 0; i < spidertron.legs.length; i++) {
        if (spidertron.legs[i].active) {
            let legDeltaX = spidertron.legs[i].targetX - spidertron.legs[i].currentX;
            let legDeltaY = spidertron.legs[i].targetY - spidertron.legs[i].currentY;
            if ((legDeltaX * legDeltaX + legDeltaY * legDeltaY) > 10) {
                let remainingTime = Math.max(0, spidertron.legs[i].stepTime + legStepInterval - time);
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
    let bodyHeight = Math.round(zOffsets.bodyHeight + Math.sin(time / 130) * 2);
    spidertron.baseElement.style.cssText = '--spidertron-location-x:' + Math.round(spidertron.currentX) + 'px;' +
                                           '--spidertron-location-y:' + Math.round(spidertron.currentY) + 'px;' +
                                           '--spidertron-body-height:' + (-bodyHeight) + 'px;' +
                                           '--spidertron-scale:' + spidertron.scale;

    for (let i = 0; i < spidertron.legs.length; i++) {
        let N = spidertron.legs[i].index;

        let deltaX = (spidertron.legs[i].currentX - legConnectionCoordinates[N].x - spidertron.currentX) / spidertron.scale;
        let deltaY = (spidertron.legs[i].currentY - legConnectionCoordinates[N].y - spidertron.currentY) / spidertron.scale + bodyHeight;
        if (spidertron.legs[i].active) {
            deltaY -= zOffsets.footUp;
        }
        let upperDeltaX = deltaX / 2;
        let upperDeltaY = deltaY / 2 - (zOffsets.legJoints - zOffsets.bodyHeight);
        let upperLength = Math.sqrt(upperDeltaX * upperDeltaX + upperDeltaY * upperDeltaY);
        let upperAngle = Math.atan2(-upperDeltaX, upperDeltaY);

        let lowerDeltaX = deltaX - upperDeltaX;
        let lowerDeltaY = deltaY - upperDeltaY;
        let lowerLength = Math.sqrt(lowerDeltaX * lowerDeltaX + lowerDeltaY * lowerDeltaY);
        let lowerAngle = Math.atan2(-lowerDeltaX, lowerDeltaY);

        spidertron.legs[i].upperElement.style.cssText = '--leg-upper-angle:' + upperAngle + 'rad;' +
                                                        '--leg-upper-length:' + upperLength + 'px;' +
                                                        '--leg-lower-angle:' + (lowerAngle - upperAngle) + 'rad;' +
                                                        '--leg-lower-length:' + lowerLength + 'px;' +
                                                        '--knee-angle:' + -((lowerAngle + upperAngle) / 2) + 'rad;';
    }
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

    let spidertronElements = document.getElementsByClassName('spidertron');
    for (let i = 0; i < spidertronElements.length; i++) {
        let spidertron = buildSpidertron(spidertronElements[i]);
        spidertronElements[i].dataset.spidertronIndex = spidertrons.length;
        updateSpidertron(spidertron, 0);
        spidertrons.push(spidertron);

        spidertronElements[i].addEventListener('click', function(e) {
            let targetSpidertron = spidertrons[e.currentTarget.dataset.spidertronIndex];
            targetSpidertron.active = !targetSpidertron.active;
            if (selectedSpidertron == targetSpidertron) {
                targetSpidertron.targetX = 0;
                targetSpidertron.targetY = 0;
                selectedSpidertron = null;
                document.body.removeChild(maskElement);
            } else {
                targetSpidertron.targetX = targetSpidertron.currentX;
                targetSpidertron.targetY = targetSpidertron.currentY;
                selectedSpidertron = targetSpidertron;
                document.body.appendChild(maskElement);
            }
            e.preventDefault();
        });
    }

    window.requestAnimationFrame(spidertronAnimationCallback);

    maskElement.addEventListener('click', function(e) {
        if (selectedSpidertron != null) {
            let spidertronRect = selectedSpidertron.baseElement.getBoundingClientRect();
            selectedSpidertron.targetX = e.clientX - spidertronRect.left + selectedSpidertron.currentX;
            selectedSpidertron.targetY = e.clientY - spidertronRect.top + selectedSpidertron.currentY;
            sortLegOrder(selectedSpidertron);
            e.preventDefault();
        }
    });
}

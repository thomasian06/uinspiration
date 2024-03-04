const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.previousPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const lowerBound = -100.0; // -100
    const upperBound = 0.0; // 0
    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.previousPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, parseFloat(upperBound)), parseFloat(lowerBound));

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

/* -- Had to add extra lines for touch events -- */

track.onmousedown = e => handleOnDown(e);
track.ontouchstart = e => handleOnDown(e.touches[0]);
track.onmouseup = e => handleOnUp(e);
track.onmouseleave = e => handleOnUp(e);
track.ontouchend = e => handleOnUp(e.touches[0]);
track.onmousemove = e => handleOnMove(e);
track.ontouchmove = e => handleOnMove(e.touches[0]);

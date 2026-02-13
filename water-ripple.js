// Water Ripple Effect - Animates SVG feTurbulence for organic underwater movement
(function() {
    'use strict';

    var turbulence = document.getElementById('water-turbulence');
    if (!turbulence) return;

    var startTime = performance.now();

    // Base frequencies - subtle enough to look like water, not glitch
    var baseX = 0.012;
    var baseY = 0.014;
    var drift = 0.003; // how much the frequency oscillates

    function animate(now) {
        // Elapsed time in seconds
        var t = (now - startTime) / 1000;

        // Use layered sine waves at different speeds for organic, non-repeating feel
        var freqX = baseX + Math.sin(t * 0.35) * drift * 0.6 
                          + Math.sin(t * 0.17) * drift * 0.4;
        var freqY = baseY + Math.cos(t * 0.28) * drift * 0.7 
                          + Math.sin(t * 0.13 + 1.2) * drift * 0.3;

        // Clamp to prevent zero or negative (would break the filter)
        freqX = Math.max(0.005, freqX);
        freqY = Math.max(0.005, freqY);

        turbulence.setAttribute('baseFrequency', freqX.toFixed(5) + ' ' + freqY.toFixed(5));

        requestAnimationFrame(animate);
    }

    // Respect prefers-reduced-motion
    var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!motionQuery.matches) {
        requestAnimationFrame(animate);
    }

    // Pause/resume if user changes motion preference
    motionQuery.addEventListener('change', function(e) {
        if (!e.matches) {
            startTime = performance.now();
            requestAnimationFrame(animate);
        }
    });
})();

(function (window) {
    document.addEventListener('DOMContentLoaded', function(event) {
        const lottieInterval = window.setInterval(() => {
            const mainBannerAnimation = document.getElementById('main-banner-animation');
            if (mainBannerAnimation && mainBannerAnimation.play) {
                mainBannerAnimation.play();
                window.clearInterval(lottieInterval)
            }
        }, 500)

        const isWideScreen = window.innerWidth > 960;
        const touchDevice = 'ontouchstart' in window;

        if (touchDevice || !isWideScreen) {
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        howItWorks();
        storesMap();
        socialProof();
        financials();
    });


    function howItWorks() {
        // animation on 'how-it-works' section
        new gsap.timeline({
            scrollTrigger: {
                trigger: '.how-it-works__wrapper',
                start: 'top center-=100'
            }
        }).add(
            gsap.fromTo('.how-it-works__overview',
                1,
                {x: '-100%'},
                {
                    x: 0,
                    delay: (index) => index * 0.3,
                    ease: Power3.easeOut
                }
            ), 0
        ).add(
            gsap.fromTo('.how-it-works__designing',
                1,
                {y: '350px'},
                {
                    y: 0,
                    ease: Power3.easeOut
                }
            ), 0.8
        ).add(
            gsap.fromTo('.how-it-works__overview-wrapper',
                1,
                {y: '350px', autoAlpha: 0},
                {
                    y: 0,
                    ease: Power3.easeOut,
                    autoAlpha: 1
                }
            ), 1
        )

        // animation of 'how-it-works' description
        gsap.fromTo('.how-it-works__description-item',
            1,
            {y: -450},
            {
                y: 0,
                delay: (index) => index * 0.25,
                ease: Power3.easeOut,
                scrollTrigger: {
                    trigger: '.how-it-works__description',
                    start: 'top center+=100'
                }
            }
        );
    }

    function storesMap() {
        const animationDuration = 1.5;
        new gsap.timeline({
            scrollTrigger: {
                trigger: '.connect-store__wrapper',
                start: 'top center'
            }
        }).add(
            gsap.fromTo('.connect-store__stores-background',
                animationDuration,
                {scale: 0},
                {
                    scale: 1,
                    ease: Power3.easeOut
                })
        ).add(
            gsap.from('.connect-store__store:not(.connect-store__store-printify)',
                animationDuration,
                {
                    top: '25%',
                    left: '45%',
                    autoAlpha: 0,
                    ease: Power3.easeOut
                }
            ),
            0
        )
    }

    function socialProof() {
        // animation of 'social-proof'
        new gsap.timeline({
            scrollTrigger: {
                trigger: '.social-proof__description',
                start: 'top center'
            }
        }).add(
            gsap.fromTo('.social-proof__text',
                1,
                {x: '-100%', autoAlpha: 0},
                {
                    x: 0,
                    autoAlpha: 1,
                    ease: Power3.easeOut
                }
            )
        ).add(
            gsap.fromTo('.social-proof__slide:nth-child(-n+3)',
                1,
                {y: '155%'},
                {
                    y: 0,
                    delay: (index) => index * 0.25,
                    ease: Power3.easeOut
                }
            ),
            '<0.5'
        );
    }

    function financials() {
        // flowers animation on 'financials' section
        new gsap.timeline({
            scrollTrigger: {
                trigger: '.financials',
                start: 'top+=100 center',
                onToggle: self => {
                    if (!self.isActive) {
                        return;
                    }
                    const financialsAnimation = document.getElementById('financials-animation');
                    financialsAnimation.play();
                },
            }
        }).add(
            gsap.fromTo('.financials__description',
                1,
                {x: '60%'},
                {
                    x: 0,
                    ease: Power3.easeInOut
                }
            )
        ).add(
            gsap.fromTo('.financials__description-wrapper',
                0.5,
                {y: '20%', autoAlpha: 0},
                {
                    y: 0,
                    autoAlpha: 1,
                    ease: Power3.easeOut
                }
            )
        );
    }
})(window);


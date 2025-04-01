import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initial page load animation
  const tl = gsap.timeline()

  tl.to(".wrapper", {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
  })

  // Header animations
  tl.from(
    ".logo-section",
    {
      y: -50,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    },
    "-=0.4",
  )

  tl.from(
    ".enam-logo",
    {
      y: -50,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    },
    "-=0.4",
  )

  tl.from(
    ".header-actions",
    {
      y: -30,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    },
    "-=0.3",
  )

  // Navigation animations
  tl.from(
    ".main-nav li",
    {
      opacity: 0,
      y: -20,
      duration: 0.4,
      stagger: 0.05,
      ease: "power1.out",
    },
    "-=0.2",
  )

  tl.from(
    ".secondary-nav li",
    {
      opacity: 0,
      y: -20,
      duration: 0.4,
      stagger: 0.05,
      ease: "power1.out",
    },
    "-=0.3",
  )

  // Sidebar animations with scroll triggers
  gsap.from(".sidebar li", {
    scrollTrigger: {
      trigger: ".sidebar",
      start: "top 80%",
    },
    x: -50,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out",
  })

  // Main content animations
  gsap.from(".slider-container", {
    scrollTrigger: {
      trigger: ".slider-container",
      start: "top 80%",
    },
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: "power2.out",
  })

  // Right sidebar animations
  gsap.from(".right-sidebar", {
    scrollTrigger: {
      trigger: ".right-sidebar",
      start: "top 80%",
    },
    x: 50,
    opacity: 0,
    duration: 0.7,
    ease: "power2.out",
  })

  // Bottom sections animations
  gsap.from(".section", {
    scrollTrigger: {
      trigger: ".bottom-sections",
      start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.2,
    ease: "power2.out",
  })

  // Hover animations for navigation
  const navItems = document.querySelectorAll(".main-nav a, .secondary-nav a")

  navItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      gsap.to(item, {
        backgroundColor: item.closest(".main-nav") ? "#004d00" : "#006400",
        duration: 0.3,
      })
    })

    item.addEventListener("mouseleave", () => {
      gsap.to(item, {
        backgroundColor: item.closest(".main-nav") ? "#006400" : "#008000",
        duration: 0.3,
      })
    })
  })

  // Sidebar hover animations
  const sidebarItems = document.querySelectorAll(".sidebar a")

  sidebarItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      gsap.to(item, {
        backgroundColor: "#e0e0e0",
        x: 5,
        duration: 0.3,
      })
    })

    item.addEventListener("mouseleave", () => {
      gsap.to(item, {
        backgroundColor: "transparent",
        x: 0,
        duration: 0.3,
      })
    })
  })

  // Image slider functionality
  let currentSlide = 0
  const slides = document.querySelectorAll(".slider img")
  const totalSlides = slides.length

  // If there's only one slide, create duplicates for the slider effect
  if (totalSlides === 1) {
    const slider = document.querySelector(".slider")
    const cloneSlide = slides[0].cloneNode(true)
    cloneSlide.classList.remove("active")
    slider.appendChild(cloneSlide)
  }

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.classList.remove("active")
      gsap.to(slide, { opacity: 0, duration: 0.5 })
    })

    // Show the current slide
    slides[index].classList.add("active")
    gsap.to(slides[index], {
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut",
    })
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length
    showSlide(currentSlide)
  }

  // Set up slider controls
  const nextBtn = document.querySelector(".next-btn")
  const prevBtn = document.querySelector(".prev-btn")

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", nextSlide)
    prevBtn.addEventListener("click", prevSlide)
  }

  // Auto-advance slides every 5 seconds
  const slideInterval = setInterval(nextSlide, 5000)

  // Pause auto-advance when hovering over slider
  const sliderContainer = document.querySelector(".slider-container")

  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", () => {
      clearInterval(slideInterval)
    })

    sliderContainer.addEventListener("mouseleave", () => {
      clearInterval(slideInterval) // Clear any existing interval
      setInterval(nextSlide, 5000) // Set a new interval
    })
  }

  // Play button animation
  const playButton = document.querySelector(".play-button")

  if (playButton) {
    playButton.addEventListener("mouseenter", () => {
      gsap.to(playButton, {
        scale: 1.1,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        duration: 0.3,
      })
    })

    playButton.addEventListener("mouseleave", () => {
      gsap.to(playButton, {
        scale: 1,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        duration: 0.3,
      })
    })

    playButton.addEventListener("click", () => {
      // Simulate video play with animation
      gsap.to(playButton, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          alert("Video would play here in a real implementation")
          gsap.to(playButton, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
          })
        },
      })
    })
  }

  // Color theme switcher
  const colorBoxes = document.querySelectorAll(".color-box")

  colorBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      let primaryColor, secondaryColor

      // Determine colors based on selected theme
      if (box.classList.contains("green")) {
        primaryColor = "#006400"
        secondaryColor = "#008000"
      } else if (box.classList.contains("orange")) {
        primaryColor = "#D84315"
        secondaryColor = "#E64A19"
      } else if (box.classList.contains("blue")) {
        primaryColor = "#0D47A1"
        secondaryColor = "#1565C0"
      } else if (box.classList.contains("purple")) {
        primaryColor = "#4A148C"
        secondaryColor = "#6A1B9A"
      }

      // Apply color changes with animation
      gsap.to(".main-nav", { backgroundColor: primaryColor, duration: 0.5 })
      gsap.to(".secondary-nav", { backgroundColor: secondaryColor, duration: 0.5 })
      gsap.to(".whats-new h3, .section h3, footer", { backgroundColor: primaryColor, duration: 0.5 })
      gsap.to(".hindi-text, .english-text, .news-archive a, .marquee-content", { color: primaryColor, duration: 0.5 })

      // Animate the color box selection
      gsap.to(box, {
        scale: 1.2,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      })
    })
  })

  // Animate marquee on hover to pause
  const marquee = document.querySelector(".marquee-content")

  if (marquee) {
    marquee.addEventListener("mouseenter", () => {
      marquee.style.animationPlayState = "paused"
    })

    marquee.addEventListener("mouseleave", () => {
      marquee.style.animationPlayState = "running"
    })
  }
})


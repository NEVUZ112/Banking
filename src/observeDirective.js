export default {
    beforeMount(el) {
      el.classList.add('before-enter')
      el._observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.classList.add('enter')
            el._observer.unobserve(el)
          }
        })
      })
      el._observer.observe(el)
    },
    unmounted(el) {
      if (el._observer) {
        el._observer.disconnect()
      }
    }
  }
  
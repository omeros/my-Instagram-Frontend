// Publisher - Subscriber
import Vue from 'vue'
export const eventBus = new Vue()

// Emits, but no one will be notified
eventBus.$emit('puk', 12);

eventBus.$on('addIcon', () => {
    console.log('addIcon')
    eventBus.$emit('addIconoComment');
})
eventBus.$on('closeModal', () => {
    eventBus.$emit('closeModalFromBus');
    console.log('closeModalFromBus Happened')
})
eventBus.$on('puk', (val) => {
    console.log('Observing that Puk ', val)
})

// Debug Technique:
window.myBus = eventBus;


// eventBus.$emit('puk', 13);
// setTimeout(()=>{
//     eventBus.$emit('puk', 3);
// }, 200)


// eventBus.$on('puk2', () => {
//     console.log('me too!')
// })
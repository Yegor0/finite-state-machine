class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.state = config.initial;
        this.prev = [];
        this.config = config;
        this.und = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.config.states[state]) throw Error('Error');
        this.prev.push(this.state);
        this.state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (!this.config.states[this.state].transitions[event]) throw Error('Error');
        this.prev.push(this.state);
        this.state = this.config.states[this.state].transitions[event];
        this.und = [];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        const tmpArray = [];
        if(!event) return ['normal', 'busy', 'hungry', 'sleeping'];

        for(let key in this.config.states) {
            for(let prop in this.config.states[key].transitions) {
              if(prop == event) tmpArray.push(key);
            }
        }
        return tmpArray;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.state == this.config.initial || this.prev.length == 0) return false;
        this.und.push(this.state);
        this.state = this.prev.pop();
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(!this.und.length) return false
        this.prev.push(this.state);
        this.state = this.und.pop();
        return true;
    }


    /**
     * Clears transition history
     */
    clearHistory() {
        this.und = [];
        this.prev = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

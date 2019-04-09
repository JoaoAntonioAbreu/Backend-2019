function Emitter(){
    this.events={};
}

Emitter.prototype.on = function(type, listener){
   if(this.events[type] == undefined){
    this.events[type] = [];
   }
   this.events[type].push(listener);

};

Emitter.prototype.emit = function(event_name){
    if(this.events[event]!= undefinned){
        this.events[event_name].forEach(function(listner){
            listener();

        })
    }
};

module.exports = Emitter;
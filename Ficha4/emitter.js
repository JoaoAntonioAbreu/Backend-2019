function Emitter(){
    this.events={};
}

Emitter.prototype.on = function(event_name, listener){
   if(this.events[event_name] == undefined){
    this.events[event_name] = [];
   }
   this.events[event_name].push(listener);

};

Emitter.prototype.emit = function(event_name){
    if(this.events[event_name]!= undefinned){
        this.events[event_name].forEach(function(listner){
            listener();

        })
    }
};

module.exports = Emitter;
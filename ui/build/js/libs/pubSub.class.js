"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = function () {
    function Events() {
        _classCallCheck(this, Events);

        this.events = {};
    }

    _createClass(Events, [{
        key: "on",
        value: function on(eventName, fn) {

            this.events[eventName] = this.events[eventName] || [];
            this.events[eventName].push(fn);
        }
    }, {
        key: "off",
        value: function off(eventName, fn) {

            if (this.events[eventName]) {
                for (var i = 0; i < this.events[eventName].length; i++) {
                    if (this.events[eventName][i] === fn) {
                        this.events[eventName].splice(i, 1);
                        break;
                    }
                };
            }
        }
    }, {
        key: "emit",
        value: function emit(eventName, data) {

            if (this.events[eventName]) {
                this.events[eventName].forEach(function (fn) {
                    fn(data);
                });
            }
        }
    }]);

    return Events;
}();
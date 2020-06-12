var Process = /** @class */ (function () {
    function Process(ID, ArriveTime, Tasks) {
        if (ArriveTime < 0)
            throw Error('Somethings wrong');
        for (var _i = 0, Tasks_1 = Tasks; _i < Tasks_1.length; _i++) {
            var x = Tasks_1[_i];
            if (x.Duration < 0)
                throw Error('Somethings wrong');
        }
        this.ID = ID;
        this.ArriveTime = ArriveTime;
        this.Tasks = Tasks;
    }
    return Process;
}());
var Scheduler = /** @class */ (function () {
    function Scheduler(Processes) {
        this.newQueue = [];
        this.readyQueue = [];
        this.waitingQueue = [];
        this.IOTask = [];
        var temp = Processes.sort(function (a, b) { return a.ArriveTime - b.ArriveTime; });
        for (var _i = 0, temp_1 = temp; _i < temp_1.length; _i++) {
            var x = temp_1[_i];
            if (x.ArriveTime == 0)
                this.readyQueue.push(x);
            else
                this.newQueue.push(x);
        }
    }
    Scheduler.prototype.FCFS = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var time = 0;
        do {
            console.log(time);
            while (((_a = this.newQueue[0]) === null || _a === void 0 ? void 0 : _a.ArriveTime) == time) {
                this.readyQueue.push(this.newQueue.shift());
            }
            while (((_b = this.waitingQueue[0]) === null || _b === void 0 ? void 0 : _b.ArriveTime) == time) {
                this.readyQueue.push(this.waitingQueue.shift());
            }
            if (this.currentProcess == undefined) {
                if (this.readyQueue.length != 0) {
                    this.currentProcess = this.readyQueue.shift();
                }
            }
            else {
                if (((_d = (_c = this.currentProcess) === null || _c === void 0 ? void 0 : _c.Tasks[0]) === null || _d === void 0 ? void 0 : _d.Duration) > 0) {
                    this.currentProcess.Tasks[0].Duration--;
                }
                if (((_f = (_e = this.currentProcess) === null || _e === void 0 ? void 0 : _e.Tasks[0]) === null || _f === void 0 ? void 0 : _f.Duration) == 0)
                    this.currentProcess.Tasks.shift();
                if (this.currentProcess.Tasks.length == 0) {
                    this.currentProcess = undefined;
                    this.currentProcess = this.readyQueue.shift();
                }
            }
            if (((_h = (_g = this.currentProcess) === null || _g === void 0 ? void 0 : _g.Tasks[0]) === null || _h === void 0 ? void 0 : _h.Type) == 'IO') {
                this.IOTask.push({
                    ID: this.currentProcess.ID,
                    Duration: this.currentProcess.Tasks[0].Duration,
                    Type: 'IO',
                    Start: time,
                    End: time + this.currentProcess.Tasks[0].Duration
                });
                this.currentProcess.ArriveTime = time + this.currentProcess.Tasks[0].Duration;
                this.currentProcess.Tasks.shift();
                this.waitingQueue.push(this.currentProcess);
                this.waitingQueue.sort(function (a, b) { return a.ArriveTime - b.ArriveTime; });
                this.currentProcess = undefined;
                continue;
            }
            time++;
        } while (this.newQueue.length != 0 || this.readyQueue.length != 0 || this.waitingQueue.length != 0 || ((_j = this.currentProcess) === null || _j === void 0 ? void 0 : _j.Tasks.length) > 0);
    };
    return Scheduler;
}());
var tasks = [{ Duration: 2, Type: 'CPU' }, { Duration: 10, Type: 'IO' }, { Duration: 7, Type: "CPU" }];
var tasks2 = [{ Duration: 5, Type: 'CPU' }, { Duration: 3, Type: 'IO' }, { Duration: 4, Type: "CPU" }];
var p = new Process('P1', 1, tasks);
var p2 = new Process('P2', 0, tasks2);
var s = new Scheduler([p, p2]);
// console.log(s);
s.FCFS();
///To do: Can fix loi ham push cua waiting queue de khi push vo luon o trang thai da sap xep

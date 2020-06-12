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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var time = 0;
        do {
            console.log(time);
            console.log(((_a = this.currentProcess) === null || _a === void 0 ? void 0 : _a.ID) + ' : ' + this.currentProcess);
            while (((_b = this.newQueue[0]) === null || _b === void 0 ? void 0 : _b.ArriveTime) == time) {
                this.readyQueue.push(this.newQueue.shift());
            }
            while (((_c = this.waitingQueue[0]) === null || _c === void 0 ? void 0 : _c.ArriveTime) == time) {
                this.readyQueue.push(this.waitingQueue.shift());
            }
            if (this.currentProcess == undefined) {
                if (this.readyQueue.length != 0) {
                    this.currentProcess = this.readyQueue.shift();
                }
            }
            else {
                if (((_e = (_d = this.currentProcess) === null || _d === void 0 ? void 0 : _d.Tasks[0]) === null || _e === void 0 ? void 0 : _e.Duration) > 0) {
                    this.currentProcess.Tasks[0].Duration--;
                }
                if (((_g = (_f = this.currentProcess) === null || _f === void 0 ? void 0 : _f.Tasks[0]) === null || _g === void 0 ? void 0 : _g.Duration) == 0)
                    this.currentProcess.Tasks.shift();
                if (this.currentProcess.Tasks.length == 0) {
                    this.currentProcess = undefined;
                    this.currentProcess = this.readyQueue.shift();
                }
            }
            if (((_j = (_h = this.currentProcess) === null || _h === void 0 ? void 0 : _h.Tasks[0]) === null || _j === void 0 ? void 0 : _j.Type) == 'IO') {
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
        } while (this.newQueue.length != 0 || this.readyQueue.length != 0 || this.waitingQueue.length != 0 || ((_k = this.currentProcess) === null || _k === void 0 ? void 0 : _k.Tasks.length) > 0);
    };
    return Scheduler;
}());
var task1 = {
    Duration: 10,
    Type: 'CPU'
};
var task2 = {
    Duration: 10,
    Type: 'IO'
};
var task3 = {
    Duration: 10,
    Type: 'CPU'
};
var tasks = [task1, task2, task3];
var tasks2 = [{ Duration: 10, Type: 'CPU' }, { Duration: 20, Type: 'IO' }, { Duration: 4, Type: "CPU" }];
var p = new Process('P1', 0, tasks);
var p2 = new Process('P2', 0, tasks2);
var s = new Scheduler([p, p2]);
// console.log(s);
s.FCFS();
///To do: Can fix loi ham push cua waiting queue de khi push vo luon o trang thai da sap xep

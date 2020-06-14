class Process {
    constructor(ID, ArriveTime, Tasks) {
        if (ArriveTime < 0)
            throw Error('Somethings wrong');
        for (const x of Tasks) {
            if (x.Duration < 0)
                throw Error('Somethings wrong');
        }
        this.ID = ID;
        this.ArriveTime = ArriveTime;
        this.Tasks = Tasks;
    }
}
class Scheduler {
    constructor() {
        this.newQueue = [];
        this.readyQueue = [];
        this.waitingQueue = [];
        this.IOTask = [];
    }
    initialize(Processes) {
        let temp = Processes.sort((a, b) => a.ArriveTime - b.ArriveTime);
        for (const x of temp) {
            if (x.ArriveTime == 0)
                this.readyQueue.push(Object.assign(x));
            else
                this.newQueue.push(Object.assign(x));
        }
    }
    FCFS(Processes) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        let ahihi = [];
        let count = 0;
        for (let i = 0; i < Processes.length; i++) {
            for (let j = 0; j < Processes[i].Tasks.length + 1; j++) {
                ahihi[count++] = [];
            }
        }
        count = 0;
        this.initialize(Processes);
        let time = 0;
        do {
            while (((_a = this.newQueue[0]) === null || _a === void 0 ? void 0 : _a.ArriveTime) == time) {
                this.readyQueue.push(this.newQueue.shift());
            }
            while (((_b = this.waitingQueue[0]) === null || _b === void 0 ? void 0 : _b.ArriveTime) == time) {
                this.readyQueue.push(this.waitingQueue.shift());
            }
            if (this.currentProcess == undefined) {
                if (this.readyQueue.length != 0) {
                    this.currentProcess = this.readyQueue.shift();
                    (_c = ahihi[count]) === null || _c === void 0 ? void 0 : _c.push(this.currentProcess.ID);
                    (_d = ahihi[count]) === null || _d === void 0 ? void 0 : _d.push(time);
                }
            }
            else {
                if (((_f = (_e = this.currentProcess) === null || _e === void 0 ? void 0 : _e.Tasks[0]) === null || _f === void 0 ? void 0 : _f.Duration) > 0) {
                    this.currentProcess.Tasks[0].Duration--;
                }
                if (((_h = (_g = this.currentProcess) === null || _g === void 0 ? void 0 : _g.Tasks[0]) === null || _h === void 0 ? void 0 : _h.Duration) == 0) {
                    this.currentProcess.Tasks.shift();
                    (_j = ahihi[count]) === null || _j === void 0 ? void 0 : _j.push(time);
                    count++;
                }
                if (this.currentProcess.Tasks.length == 0) {
                    this.currentProcess = undefined;
                    continue;
                }
            }
            if (((_l = (_k = this.currentProcess) === null || _k === void 0 ? void 0 : _k.Tasks[0]) === null || _l === void 0 ? void 0 : _l.Type) == 'IO') {
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
                this.waitingQueue.sort((a, b) => a.ArriveTime - b.ArriveTime);
                this.currentProcess = undefined;
                continue;
            }
            time++;
        } while (this.newQueue.length != 0 || this.readyQueue.length != 0 || this.waitingQueue.length != 0 || ((_m = this.currentProcess) === null || _m === void 0 ? void 0 : _m.Tasks.length) > 0);
        ahihi.sort((a, b) => {
            if (a[0] < b[0])
                return -1;
            else if (a[0] > b[0])
                return 1;
            return 0;
        });
        ahihi = ahihi.filter(x => x.length != 0);
        console.log(ahihi);
        return ahihi;
    }
    SJF(Processes) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        let ahihi = [];
        let count = 0;
        for (let i = 0; i < Processes.length; i++) {
            for (let j = 0; j < Processes[i].Tasks.length + 1; j++) {
                ahihi[count++] = [];
            }
        }
        this.initialize(Processes);
        let time = 0;
        count = 0;
        do {
            while (((_a = this.newQueue[0]) === null || _a === void 0 ? void 0 : _a.ArriveTime) == time) {
                this.readyQueue.push(this.newQueue.shift());
            }
            while (((_b = this.waitingQueue[0]) === null || _b === void 0 ? void 0 : _b.ArriveTime) == time) {
                this.readyQueue.push(this.waitingQueue.shift());
            }
            this.readyQueue.sort((a, b) => {
                return (a === null || a === void 0 ? void 0 : a.Tasks[0].Duration) - (b === null || b === void 0 ? void 0 : b.Tasks[0].Duration);
            });
            if (this.currentProcess == undefined) {
                if (this.readyQueue.length != 0) {
                    this.currentProcess = this.readyQueue.shift();
                    (_c = ahihi[count]) === null || _c === void 0 ? void 0 : _c.push(this.currentProcess.ID);
                    (_d = ahihi[count]) === null || _d === void 0 ? void 0 : _d.push(time);
                }
            }
            else {
                if (((_f = (_e = this.currentProcess) === null || _e === void 0 ? void 0 : _e.Tasks[0]) === null || _f === void 0 ? void 0 : _f.Duration) > 0) {
                    this.currentProcess.Tasks[0].Duration--;
                }
                if (((_h = (_g = this.currentProcess) === null || _g === void 0 ? void 0 : _g.Tasks[0]) === null || _h === void 0 ? void 0 : _h.Duration) == 0) {
                    this.currentProcess.Tasks.shift();
                    (_j = ahihi[count]) === null || _j === void 0 ? void 0 : _j.push(time);
                    count++;
                }
                if (this.currentProcess.Tasks.length == 0) {
                    this.currentProcess = undefined;
                    continue;
                }
            }
            if (((_l = (_k = this.currentProcess) === null || _k === void 0 ? void 0 : _k.Tasks[0]) === null || _l === void 0 ? void 0 : _l.Type) == 'IO') {
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
                this.waitingQueue.sort((a, b) => a.ArriveTime - b.ArriveTime);
                this.currentProcess = undefined;
                continue;
            }
            time++;
        } while (this.newQueue.length != 0 || this.readyQueue.length != 0 || this.waitingQueue.length != 0 || ((_m = this.currentProcess) === null || _m === void 0 ? void 0 : _m.Tasks.length) > 0);
        ahihi.sort((a, b) => {
            if (a[0] < b[0])
                return -1;
            else if (a[0] > b[0])
                return 1;
            return 0;
        });
        ahihi = ahihi.filter(x => x.length != 0);
        return ahihi;
    }
    SRTF(Processes) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        let ahihi = [];
        let count = 0;
        for (let i = 0; i < Processes.length; i++) {
            for (let j = 0; j < Processes[i].Tasks.length + 1; j++) {
                ahihi[count++] = [];
            }
        }
        this.initialize(Processes);
        let time = 0;
        count = 0;
        do {
            while (((_a = this.newQueue[0]) === null || _a === void 0 ? void 0 : _a.ArriveTime) == time) {
                this.readyQueue.push(this.newQueue.shift());
            }
            while (((_b = this.waitingQueue[0]) === null || _b === void 0 ? void 0 : _b.ArriveTime) == time) {
                this.readyQueue.push(this.waitingQueue.shift());
            }
            this.readyQueue.sort((a, b) => {
                return (a === null || a === void 0 ? void 0 : a.Tasks[0].Duration) - (b === null || b === void 0 ? void 0 : b.Tasks[0].Duration);
            });
            if (this.currentProcess == undefined) {
                if (this.readyQueue.length != 0) {
                    this.currentProcess = this.readyQueue.shift();
                    (_c = ahihi[count]) === null || _c === void 0 ? void 0 : _c.push(this.currentProcess.ID);
                    (_d = ahihi[count]) === null || _d === void 0 ? void 0 : _d.push(time);
                }
            }
            else {
                if (((_f = (_e = this.currentProcess) === null || _e === void 0 ? void 0 : _e.Tasks[0]) === null || _f === void 0 ? void 0 : _f.Duration) > ((_h = (_g = this.readyQueue[0]) === null || _g === void 0 ? void 0 : _g.Tasks[0]) === null || _h === void 0 ? void 0 : _h.Duration)) {
                    this.readyQueue.push(this.currentProcess);
                    this.currentProcess = this.readyQueue.shift();
                    (_j = ahihi[count]) === null || _j === void 0 ? void 0 : _j.push(time);
                    count++;
                    (_k = ahihi[count]) === null || _k === void 0 ? void 0 : _k.push(this.currentProcess.ID);
                    (_l = ahihi[count]) === null || _l === void 0 ? void 0 : _l.push(time);
                }
                if (((_o = (_m = this.currentProcess) === null || _m === void 0 ? void 0 : _m.Tasks[0]) === null || _o === void 0 ? void 0 : _o.Duration) > 0) {
                    this.currentProcess.Tasks[0].Duration--;
                }
                if (((_q = (_p = this.currentProcess) === null || _p === void 0 ? void 0 : _p.Tasks[0]) === null || _q === void 0 ? void 0 : _q.Duration) == 0) {
                    this.currentProcess.Tasks.shift();
                    (_r = ahihi[count]) === null || _r === void 0 ? void 0 : _r.push(time);
                    count++;
                }
                if (this.currentProcess.Tasks.length == 0) {
                    this.currentProcess = undefined;
                    continue;
                }
            }
            if (((_t = (_s = this.currentProcess) === null || _s === void 0 ? void 0 : _s.Tasks[0]) === null || _t === void 0 ? void 0 : _t.Type) == 'IO') {
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
                this.waitingQueue.sort((a, b) => a.ArriveTime - b.ArriveTime);
                this.currentProcess = undefined;
                continue;
            }
            time++;
        } while (this.newQueue.length != 0 || this.readyQueue.length != 0 || this.waitingQueue.length != 0 || ((_u = this.currentProcess) === null || _u === void 0 ? void 0 : _u.Tasks.length) > 0);
        ahihi.sort((a, b) => {
            if (a[0] < b[0])
                return -1;
            else if (a[0] > b[0])
                return 1;
            return 0;
        });
        ahihi = ahihi.filter(x => x.length != 0);
        console.log(ahihi);
        return ahihi;
    }
}


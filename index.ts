interface Task {
    readonly ID?: string;
    Duration: number;
    readonly Type: 'CPU' | 'IO';
}

interface IOTask extends Task {
    readonly ID?: string;
    Duration: number;
    readonly Type: 'IO';
    readonly Start: number;
    readonly End: number;
}

class Process {
    readonly ID: string;
    ArriveTime: number;
    readonly Tasks: Task[];

    constructor(ID: string, ArriveTime: number, Tasks: Task[]) {
        if (ArriveTime < 0) throw Error('Somethings wrong');
        for (const x of Tasks) {
            if (x.Duration < 0) throw Error('Somethings wrong');
        }
        this.ID = ID;
        this.ArriveTime = ArriveTime;
        this.Tasks = Tasks;
    }
}

class Scheduler {

    newQueue: Process[] = [];
    readyQueue: Process[] = [];
    waitingQueue: Process[] = [];
    IOTask: IOTask[] = [];

    currentProcess: Process | undefined;

    constructor() {

    }

    initialize(Processes: Process[]): void {
        let temp = Processes.sort((a, b) => a.ArriveTime - b.ArriveTime);
        for (const x of temp) {
            if (x.ArriveTime == 0) this.readyQueue.push(Object.assign(x));
            else this.newQueue.push(Object.assign(x));
        }
    }

    FCFS(Processes: Process[]): any {

        let ahihi: [][] | any = [];
        let count = 0;

        for (let i = 0; i < Processes.length; i++) {
            for (let j = 0; j < Processes[i].Tasks.length + 1; j++) {
                ahihi[count++] = [];
            }
        }
        count = 0;

        this.initialize(Processes);
        let time: number = 0;
        

        do {
            while (this.newQueue[0]?.ArriveTime == time) {
                this.readyQueue.push(this.newQueue.shift());
            }

            while (this.waitingQueue[0]?.ArriveTime == time) {
                this.readyQueue.push(this.waitingQueue.shift());
            }

            if (this.currentProcess == undefined) {
                if (this.readyQueue.length != 0) {
                    this.currentProcess = this.readyQueue.shift();
                    ahihi[count]?.push(this.currentProcess.ID);
                    ahihi[count]?.push(time);
                }
            } else {
                if (this.currentProcess?.Tasks[0]?.Duration > 0) {
                    this.currentProcess.Tasks[0].Duration--;
                }
                if (this.currentProcess?.Tasks[0]?.Duration == 0) {
                    this.currentProcess.Tasks.shift();
                    ahihi[count]?.push(time);
                    count++;
                }

                if (this.currentProcess.Tasks.length == 0) {
                    this.currentProcess = undefined;
                    // this.currentProcess = this.readyQueue.shift();
                    // ahihi[count]?.push(this.currentProcess?.ID);
                    // ahihi[count]?.push(time);
                    continue;
                }
            }

            if (this.currentProcess?.Tasks[0]?.Type == 'IO') {
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
        } while (this.newQueue.length != 0 || this.readyQueue.length != 0 || this.waitingQueue.length != 0 || this.currentProcess?.Tasks.length > 0);


        ahihi.sort((a, b) => {
            if (a[0] < b[0])
                return -1;
            else if (a[0] > b[0]) return 1;
            return 0;
        });
        console.log(ahihi);
        return ahihi;
    }

    SJF(Processes: Process[]): any {

        let ahihi: [][] | any = [];
        let count = 0;

        for (let i = 0; i < Processes.length; i++) {
            for (let j = 0; j < Processes[i].Tasks.length + 1; j++) {
                ahihi[count++] = [];
            }
        }
        


        this.initialize(Processes);
        let time: number = 0;
        count = 0;
        
        do {
            while (this.newQueue[0]?.ArriveTime == time) {
                this.readyQueue.push(this.newQueue.shift());
            }

            while (this.waitingQueue[0]?.ArriveTime == time) {
                this.readyQueue.push(this.waitingQueue.shift());
            }

            this.readyQueue.sort((a, b) => {
                return a?.Tasks[0].Duration - b?.Tasks[0].Duration;
            });


            if (this.currentProcess == undefined) {
                if (this.readyQueue.length != 0) {
                    this.currentProcess = this.readyQueue.shift();
                    ahihi[count]?.push(this.currentProcess.ID);
                    ahihi[count]?.push(time);
                }
            } else {
                if (this.currentProcess?.Tasks[0]?.Duration > 0) {
                    this.currentProcess.Tasks[0].Duration--;
                }
                if (this.currentProcess?.Tasks[0]?.Duration == 0) {
                    this.currentProcess.Tasks.shift();
                    ahihi[count]?.push(time);
                    count++;
                }

                if (this.currentProcess.Tasks.length == 0) {
                    this.currentProcess = undefined;
                    // this.currentProcess = this.readyQueue.shift();
                    // ahihi[count]?.push(this.currentProcess?.ID);
                    // ahihi[count]?.push(time);
                    continue;
                }
            }

            if (this.currentProcess?.Tasks[0]?.Type == 'IO') {
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
        } while (this.newQueue.length != 0 || this.readyQueue.length != 0 || this.waitingQueue.length != 0 || this.currentProcess?.Tasks.length > 0);


        ahihi.sort((a, b) => {
            if (a[0] < b[0])
                return -1;
            else if (a[0] > b[0]) return 1;
            return 0;
        });
        console.log(ahihi);
        return ahihi;
    }
}


let tasks: Task[] = [{ Duration: 2, Type: 'CPU' }, { Duration: 10, Type: 'IO' }, { Duration: 7, Type: "CPU" }];
let tasks2: Task[] = [{ Duration: 5, Type: 'CPU' }, { Duration: 3, Type: 'IO' }, { Duration: 4, Type: "CPU" }];
let tasks3: Task[] = [{ Duration: 9, Type: 'CPU' }, { Duration: 7, Type: 'IO' }, { Duration: 8, Type: "CPU" }];

let p = new Process('P1', 1, tasks);
let p2 = new Process('P2', 0, tasks2);
let p3 = new Process('P3', 0, tasks3);
let s = new Scheduler();
// console.log(s);
s.SJF([p, p2, p3]);



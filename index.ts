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

    constructor(Processes: Process[]) {
        let temp = Processes.sort((a, b) => a.ArriveTime - b.ArriveTime);

        for (const x of Processes) {
            if (x.ArriveTime == 0) this.readyQueue.push(x);
            else this.newQueue.push(x);
        }
    }

    FCFS(): void {
        let time = 0;

        do {
            console.log(time);
            console.log(this.currentProcess?.ID + ' : ' + this.currentProcess);
            while (this.newQueue[0]?.ArriveTime == time) {
                this.readyQueue.push(this.newQueue.shift());
            }

            while (this.waitingQueue[0]?.ArriveTime == time) {
                this.readyQueue.push(this.waitingQueue.shift());
            }

            if (this.currentProcess == undefined) {
                if (this.readyQueue.length != 0) {
                    this.currentProcess = this.readyQueue.shift();
                }
            } else {
                if (this.currentProcess?.Tasks[0]?.Duration > 0) {
                    this.currentProcess.Tasks[0].Duration--;
                }
                if (this.currentProcess?.Tasks[0]?.Duration == 0) this.currentProcess.Tasks.shift();
                if (this.currentProcess.Tasks.length == 0) {
                    this.currentProcess = undefined;
                    this.currentProcess = this.readyQueue.shift();
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
                this.currentProcess = undefined;
                continue;
            }
            
            time++;
        } while ((this.newQueue.length != 0 || this.readyQueue.length != 0 || this.waitingQueue.length != 0) || this.currentProcess?.Tasks.length > 0);
    }
}

let task1: Task = {
    Duration: 10,
    Type: 'CPU'
}

let task2: Task = {
    Duration: 10,
    Type: 'IO'
}

let task3: Task = {
    Duration: 10,
    Type: 'CPU'
}

let tasks: Task[] = [task1, task2, task3];
let tasks2: Task[] = [{Duration: 10, Type: 'CPU'}, {Duration: 20, Type: 'IO'}, {Duration: 4, Type: "CPU"}];

let p = new Process('P1', 0, tasks);
let p2 = new Process('P2', 0, tasks2);
let s = new Scheduler([p, p2]);
// console.log(s);
s.FCFS();



/// Can fix loi ham push cua queue de khi push vo luon o trang thai da sap xep

const { getCurrentBrainBuff } = require('./controllers/brainBuffController');
console.log("From Controller:", require('./controllers/brainBuffController').__dirname);
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

const getWeekId = () => {
    const now = new Date();
    const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    const dayNr = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - dayNr + 3);
    const firstThursday = d.valueOf();
    d.setMonth(0, 1);
    if (d.getDay() !== 4) {
        d.setMonth(0, 1 + ((4 - d.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - d) / 604800000);
};

const date = new Date();
console.log("Scheduler logic: ", getWeekNumber(date));
console.log("Controller logic:", getWeekId());

function start() {
    var inp = document.getElementById('input');
    var output = document.getElementById('console');
    output.innerText = "Обработка...";
    var lines = inp.value.split('\n');
    var res = [];
    var piket = {};
    var lruds = [];
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        var a = /\s*(\w+)\s+([\w-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)/.exec(line);

        if (!a || a.length <= 1) {
            if (line[0] === "#" || ["extend right", "extend left", "extend vertical"].indexOf(line) === -1)
                res.push(line);

            continue;
        }
        var zamer = {
            from: a[1],
            to: a[2],
            dist: parseFloat(a[3]),
            az: parseFloat(a[4]),
            ang: parseFloat(a[5])
        }


        if (zamer.to === '-') {
            lruds.push(zamer);
        } else if (piket.from !== zamer.from || piket.to !== zamer.to) {
            if (piket.from)
                res.push(guess(piket, lruds));
            lruds.forEach(function (z) {

                res.push(format_piket(z) + "\t0\t0\t0\t0");
            });
            piket.from = zamer.from;
            piket.to = zamer.to;
            piket.dist = zamer.dist;
            piket.az = zamer.az;
            piket.ang = zamer.ang;
            lruds = [];
        }

    }
    if (lruds.length === 0)
        res.push(format_piket(piket) + "\t0\t0\t0\t0");
    output.innerText = res.join("\n");
}

function removeEjik(piket, zamers) {
    var chisl = zamers.filter(z => z.from === piket.from);
    if (chisl.length > 4) {
        chisl = chisl.slice(0, 4);
    }
    var znam = zamers.filter(z => z.from === piket.to);
    if (znam.length > 4) {
        znam = znam.slice(0, 4);
    }
    return chisl.concat(znam);
}

function guess(piket, zamers_all) {

    var zamers = removeEjik(piket, zamers_all);
    if (zamers.length !== zamers_all)
        console.log("found ejik at " + piket.from + " " + piket.to);
    var nizs = [0, 0];
    for (var i = 0; i < zamers.length; i++) {
        var z = zamers[i];
        if (z.ang < -50) {
            if (z.from === piket.from)
                nizs[0] = z.dist;
            else if (z.from === piket.to)
                nizs[1] = z.dist;
        }
    }
    var verhs = [0, 0];
    for (var i = 0; i < zamers.length; i++) {
        var z = zamers[i];
        if (z.ang > -50) {
            if (z.from === piket.from)
                verhs[0] = z.dist;
            else if (z.from === piket.to)
                verhs[1] = z.dist;
        }
    }
    var lefts = [0, 0]
    for (var i = 0; i < zamers.length; i++) {
        var z = zamers[i];
        if (z.ang > -50 && z.ang < 50 && z.az < piket.az) {
            if (z.from === piket.from)
                lefts[0] = z.dist;
            else if (z.from === piket.to)
                lefts[1] = z.dist;
        }
    }
    var rights = [0, 0]
    for (var i = 0; i < zamers.length; i++) {
        var z = zamers[i];
        if (z.ang > -50 && z.ang < 50 && z.az > piket.az) {
            if (z.from === piket.from)
                rights[0] = z.dist;
            else if (z.from === piket.to)
                rights[1] = z.dist;
        }
    }
    var drob = false;
    for (var i = 0; i < zamers.length; i++) {

        var z = zamers[i];
        if (z.from === piket.from) {
            drob = true;
            break;
        }
    }

    return format_piket(piket) + "\t" +

        (drob ? "[" + lefts[0] + " " + lefts[1] + "]" : lefts[1]) + "\t" +
        (drob ? "[" + rights[0] + " " + rights[1] + "]" : rights[1]) + "\t" +
        (drob ? "[" + verhs[0] + " " + verhs[1] + "]" : verhs[1]) + "\t" +
        (drob ? "[" + nizs[0] + " " + nizs[1] + "]" : nizs[1]);

}

function format_piket(piket) {
    return piket.from + "\t" + piket.to + "\t"
        + piket.dist + "\t" + piket.az + "\t" + piket.ang;
}

start()
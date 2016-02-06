function callback_example() {
    function process(callback) {
        if (typeof callback === 'function') {
            callback();
        }
    }

    process(function () {
        console.log('Hello from callback!');
    });
}

function setTimeout_example() {
    setTimeout(function () {
        console.log('time 1000');
    }, 1000);

    longComputation();

    setTimeout(function () {
        console.log('time 0');
    }, 0);

    longComputation();
}

function example1() {
    $.on('button', 'click', function () {
        setTimeout(function () {
          console.log('Button clicked!');
        }, 2000);
    });

    console.log('Hi!');

    setTimeout(function () {
        console.log('Click the button!');
    }, 5000);

    console.log('Welcome to loupe.');
}

function example2() {
    for (var i = 0; i < 5; i++) {
        setTimeout(function () {
            console.log('hi');
        }, 1000);
    }
}

function example3() {
    var array = [1, 2, 3, 4, 5];

    array.forEach(function (i) {
        console.log(i);
    });

    function partialForEach(list, fun) {
        list.forEach(function (i) {
            setTimeout(function () {
                fun(i);
            }, 0);
        });
    }

    partialForEach(array, function (i) {
        console.log(i);
    });
}

function example4_util_1() {
    function sleep(milliseconds) {
        var start = new Date().getTime();

        for (var i = 0; i < 1e7; i++) {
            var now = new Date().getTime();
            var diff = (now - start);

            if (diff > milliseconds) {
                break;
            }
        }
    }
}

function example4_util_2() {
    function work(x) {
        console.log('work: ' + x);
        sleep(1000);
    }
}

function example4() {
    for (var i = 0; i < 3; i++) {
        work(i);
    }
}

function example5() {
    function myFor(i, value) {
        if (i < value) {
            work(i);

            setTimeout(function () {
                myFor(i + 1, value);
            }, 0);
        }
    }

    myFor(0, 10);
}

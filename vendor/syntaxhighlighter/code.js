keywords = ['if', 'typeof', 'function', 'return'];

function function_body_to_string(fun) {
    var body = fun.toString().match(/[^{]*{[\t ]*\n([^]*)\n}$/)[1];
    var spaces = body.match(/[\t\x20]*../);
    body = body.replace(/[^\n]*/g, function (str) {
        var r = str.slice(spaces.length + 1, str.length);
        return r;
    });
    return body;
}

function format_code(code, hilight_lines) {
    hilight_lines = hilight_lines ? hilight_lines : [];
    var table = document.createElement('table');
    table.style.border = '1';
    table.style.cellpadding = '0';
    table.style.cellspacing = '0';

    var code_lines = code.split('\n');

    var tr = table.insertRow();
    tr.appendChild(__make_gutter(code_lines.length, hilight_lines));
    tr.appendChild(__format_code(code_lines, hilight_lines));

    return table;
}

function __format_line(line) {
    line = line ? line : ' ';
    var elems = line.match(/(\w+)|('.*')|(\s+)|./g);
    var result = [];

    if (/\s+/.test(elems[0])) {
        var element = document.createElement('code2');
        element.className = 'spaces';
        var text = elems[0].replace(/\s/g, '\xa0');
        element.appendChild(document.createTextNode(text));
        elems.shift();
        result.push(element);
    }

    for (; elems.length > 0; elems.shift()) {
        var element = document.createElement('code2');
        if (/'.*'/.test(elems[0])) { // contain string
            element.className = 'string';
            element.appendChild(document.createTextNode(elems[0]));
        } else if (keywords.indexOf(elems[0]) != -1) {
            element.className = 'keyword';
            element.appendChild(document.createTextNode(elems[0]));
        } else {
            element.className = 'plain';
            var string = elems[0];
            while (elems.length > 1 && !/'.*'/.test(elems[1]) &&
            keywords.indexOf(elems[1]) == -1) {
                elems.shift();
                string += elems[0];
            }
            element.appendChild(document.createTextNode(string));
        }
        result.push(element);
    }
    return result;
}

function __format_code(lines, hilight_lines) {
    var element = document.createElement('td');
    element.className = 'code2';
    for (var value in lines) {
        var line = document.createElement('div');
        if (hilight_lines.indexOf(Number(value) + 1) != -1)
            line.className = 'line highlighted';
        else
            line.className = 'line';
        var elements = __format_line(lines[value]);
        for (var e in elements)
            line.appendChild(elements[e]);
        element.appendChild(line);
    }
    return element;
}

function __make_gutter(lines, list_hilight) {
    var element = document.createElement('td');
    element.className = 'gutter';
    for (var i = 1; i <= lines; i++) {
        var line = document.createElement('div');
        if (list_hilight.indexOf(i) != -1)
            line.className = 'line highlighted';
        else
            line.className = 'line';
        line.appendChild(document.createTextNode(i));
        element.appendChild(line);
    }
    return element;
}

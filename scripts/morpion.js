$(document).ready(function() {
    $.fn.morpion = function(options = {}) {
        options = $.extend({}, { replayButton: '#replay' }, options);
        let currentPlayer = 1;
        const self = this;
        const rows = $(this).find('.row');
        const cells = $(this).find('.cell');
        const winnerDisplay = $(this).find('.win-display');
        const replay = $(options.replayButton);
        win1 = 0;
        win2 = 0;


        $(rows).each(function(y, row) {
            $(row)
                .find('.cell')
                .each(function(x, cell) {
                    $(cell).data('y', y);
                    $(cell).data('x', x);
                });
        });

        $(replay).click(function() {
            $(cells).each(function(_, cell) {
                $(cell).removeData('player');
                $(cell).text('');
            });
            $(self).removeClass('won');
        });

        function line(x, y, dx, dy) {
            let current = null;
            for (let i = 0; i < 3; i++) {
                const cell = cells[y * 3 + x];
                if (current === null) {
                    current = $(cell).data('player');
                }
                if ($(cell).data('player') !== current) {
                    return null;
                }
                x += dx;
                y += dy;
            }
            return current;
        }

        function full() {
            for (let i = 0; i < $(cells).length; i++) {
                if (!$(cells[i]).data('player')) return false;
            }
            return true;
        }

        function win(cell) {
            const x = $(cell).data('x');
            const y = $(cell).data('y');
            const result = line(x, 0, 0, 1) || line(0, y, 1, 0) || line(0, 0, 1, 1) || line(2, 0, -1, 1);
            if (result) {
                $(winnerDisplay).text(`Joueur ${result} a gagné !`);
                $(self).addClass('won');
                count();
            }
            return result;
        }

        function count(result) {
            if (result == 1) {
                win1++;
                $("#playerOne").html(win1);
            } else {
                win2++;
                $("#playerTwo").html(win2);
            }
        }

        $(cells).click(function() {
            if ($(this).data('player')) return;
            $(this).text(currentPlayer === 1 ? 'X' : 'O');
            $(this).data('player', currentPlayer);
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            if (!win(this) && full()) {
                $(winnerDisplay).text('Match nul');
                $(self).addClass('won');
            }
        });
    };
    $('#grid').morpion({ replayButton: '#replay' });
});
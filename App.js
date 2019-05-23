$(document).ready(function () {

//Массив вариантов атаки/защиты врага
    const enemyAttackVariants = [
        ["Head", "Head"],
        ["Head", "Body"],
        ["Head", "Legs"],
        ["Body", "Head"],
        ["Body", "Body"],
        ["Body", "Legs"],
        ["Legs", "Head"],
        ["Legs", "Body"],
        ["Legs", "Legs"],
    ]

//Параметры класса Воин
    const Warriors = {
        role: "Warrior",
        HP: 500,
        str: 5,
        def: 100,
        status: "friend",
        hpDisplay: 107
    };
//Параметры класса Маг
    const Sorcerrys = {
        role: "Sorcerry",
        HP: 100,
        str: 2,
        def: 70,
        status: "enemy"
    };
//Параметры класса Враг 1
    const Enemy1 = {
        role: "Enemy",
        HP: 50,
        str: 50,
        def: 50,
        status: "enemy",
        enemyAttackMatrix: []
    }
//Параметры класса Враг 2
    const Enemy2 = {
        role: "Enemy",
        HP: 250,
        str: 150,
        def: 150,
        status: "enemy",
        enemyAttackMatrix: []
    }

//Описнаие класса-родителя
    class Person {

        constructor(name) {
            this.name = name;
        }

        getParams() {
            const params = {
                name: this.name,
                role: this.role,
                HP: this.HP,
                str: this.str,
                def: this.def
            };
            return params
        }
        attack(target) {
            let hero = this.name;
            let enemy = target.name;
            let damage = target.HP - this.str;
            return "Ваш герой - " + hero + ", " + "Вы атакуете - " + enemy + " У врага жизней было - " + target.HP + " Стало - " + damage;
        }
    }

//Описнаие класса-Воина
    class Warrior extends Person {

        constructor(name) {
            super(name);
            this.role = Warriors.role;
            this.HP = Warriors.HP;
            this.str = Warriors.str;
            this.def = Warriors.def;
        }

    }
//Описнаие класса-Мага
    class Sorcerry extends Person {

        constructor(name) {
            super(name);
            this.role = Sorcerrys.role;
            this.HP = Sorcerrys.HP;
            this.str = Sorcerrys.str;
            this.def = Sorcerrys.def;
        }

    }

//Функция рандомного выбора врага
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

//Функция рандомного выбора варианта удара/блока врага
function getRandomAttack(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

//Генерация стартового персонажа
    $("#startGame").click(function () {
        let currentHero = {};
        let enemyHero = {};
        let variantsEnemy = getRandomInt(1,3);
        let nameHeroInput = $("#nameHero").val();
        let classHeroInput = $("#classHero").val();

        if (classHeroInput == "Warrior") {
            currentHero.name = nameHeroInput
            currentHero.class = classHeroInput
            currentHero.HP = Warriors.HP
            currentHero.str = Warriors.str
            currentHero.def = Warriors.def
            currentHero.status = Warriors.status

            let myHero = new Warrior(nameHeroInput); //Экземпляр воина

            $("#nameHeroList").text(nameHeroInput);
            $("#roleHeroList").text("Role: " + myHero.role);
            $("#HPHeroList").text("HP: " + myHero.HP);
            $("#strHeroList").text("Strength: " + myHero.str);
            $("#defHeroList").text("Defence: " + myHero.def);
        } else {
            currentHero.name = nameHeroInput
            currentHero.class = classHeroInput
            currentHero.HP = Sorcerrys.HP
            currentHero.str = Sorcerrys.str
            currentHero.def = Sorcerrys.def

            let myHero = new Sorcerry(nameHeroInput); //Экземпляр мага

            $("#nameHeroList").text(nameHeroInput);
            $("#roleHeroList").text("Role: " + myHero.role);
            $("#HPHeroList").text("HP: " + myHero.HP);
            $("#strHeroList").text("Strength: " + myHero.str);
            $("#defHeroList").text("Defence: " + myHero.def);
        }

        if (variantsEnemy == 1){
            enemyHero.name = "Враг 1"
            enemyHero.HP = Enemy1.HP
            enemyHero.str = Enemy1.str
            enemyHero.def = Enemy1.def
            enemyHero.status = Enemy1.status
            enemyHero.enemyAttackMatrix = Enemy1.enemyAttackMatrix
        }else if (variantsEnemy == 2){
            enemyHero.name = "Враг 2"
            enemyHero.HP = Enemy2.HP
            enemyHero.str = Enemy2.str
            enemyHero.def = Enemy2.def
            enemyHero.status = Enemy2.status
            enemyHero.enemyAttackMatrix = Enemy2.enemyAttackMatrix
        }

        $("#displayHeroHP").text(currentHero.HP + "/" + currentHero.HP);
        $("#displayHP").text(enemyHero.HP);
        $(".heroHP").css("width", "107px");
        $("#msform").css("display", "none");
        console.log("Random - " + variantsEnemy)

//Кнопка Attack
        $('#attackBtn').click(function(){
            
            let heroAttackMatrix = [];
            let attackParam = $("input:radio[name ='attack']:checked").val();
            let defenceParam = $("input:radio[name ='defence']:checked").val();
            heroAttackMatrix.push(attackParam,defenceParam);

            if (currentHero.HP > 0 && enemyHero.HP > 0){ // Если все живы - битва
                $('.statistic').text('');
                enemyHero.enemyAttackMatrix.push(enemyAttackVariants[getRandomAttack(0,9)])

                if (JSON.stringify(heroAttackMatrix[0]) == JSON.stringify(enemyHero.enemyAttackMatrix[0][0]) && JSON.stringify(enemyHero.enemyAttackMatrix[0][1]) == JSON.stringify(heroAttackMatrix[0]))
                {
                    $('.statistic').html("<p>HERO - " + heroAttackMatrix + "</p>"+"<p>Enemy - "+ enemyHero.enemyAttackMatrix + "<p>Все удары блокированы!</p>");
                    enemyHero.enemyAttackMatrix = [];
                }

                //Герой заблокировал удар
                else if (JSON.stringify(heroAttackMatrix[1]) == JSON.stringify(enemyHero.enemyAttackMatrix[0][0])){
                    $('.statistic').html("<p>HERO - " + heroAttackMatrix + "</p>"+"<p>Enemy - "+ enemyHero.enemyAttackMatrix + "<p>Герой заблокировал удар</p>");
                    enemyHero.enemyAttackMatrix = [];

                //Враг заблокировал удар    
                }else if (JSON.stringify(enemyHero.enemyAttackMatrix[0][1]) == JSON.stringify(heroAttackMatrix[0])){
                    $('.statistic').html("<p>HERO - " + heroAttackMatrix + "</p>"+"<p>Enemy - "+ enemyHero.enemyAttackMatrix + "<p>Враг заблокировал удар</p>");
                    enemyHero.enemyAttackMatrix = [];
                }
                else  {
                    enemyHero.HP = enemyHero.HP - currentHero.str;
                    currentHero.HP = currentHero.HP - enemyHero.str;

                    //Анимация удара по врагу
                    $(".slashFx").fadeIn("slow");
                    setTimeout(function() {
                         $(".slashFx").fadeOut("slow"); 
                        }, 200);

                    $("#displayHP").text(enemyHero.HP);
                    $("#displayHeroHP").text(currentHero.HP);
                    Warriors.hpDisplay -= 10;
                    $(".heroHP").css("width", Warriors.hpDisplay+"px");
                    $('.statistic').html("<p>HERO - " + heroAttackMatrix + "</p>"+"<p>Enemy - "+ enemyHero.enemyAttackMatrix + "<p>Оба попали в цель!</p>");
                    enemyHero.enemyAttackMatrix = [];
                }
            } else  {
                $('.statistic').html("<p>Бой закончен!</p>");
                console.log('Бой закончен')
            }
            console.log("----------------------------------------------------");
    });
    });
});
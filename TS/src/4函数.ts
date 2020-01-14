// 函数类型

{
    // 为函数定义类型
    // TS 可以根据返回语句自动推断出返回值类型，所以通常省略它
    function add(x: number, y: number): number {
        return x + y;
    }
    let myAdd = function (x: number, y: number): number {
        return x + y;
    }

    // 书写完整函数类型
    let myAdd1: (x: number, y: number) => number =
        function (x: number, y: number): number { return x + y; };

    // 推断类型
}

// 可选参数和默认参数

{
    // 1
    function buildname(firstName: string, lastName: string) {
        return firstName + lastName;
    }
    let fullName1 = buildname('hello'); // error 参数过少
    let fullName2 = buildname('hello', 'world'); // helloworld
    let fullName3 = buildname('hello', 'world', 'okok'); // error 参数过多
}

{
    // 2
    function buildname(firstName: string, lastName?: string) {
        return firstName + lastName;
    }
    let fullName1 = buildname('hello'); // helloundefined
    let fullName2 = buildname('hello', 'world'); // helloworld
    let fullName3 = buildname('hello', 'world', 'okok'); // error 参数过多
}

{
    // 3
    function buildname(firstName: string, lastName = 'smith') {
        return firstName + lastName;
    }
    let fullName1 = buildname('hello'); // hellosmith
    let fullName2 = buildname('hello', 'world'); // helloworld
    let fullName3 = buildname('hello', 'world', 'okok'); // error 参数过多
}

{
    // 5
    function buildname(firstName = 'will', lastName: string) {
        return firstName + lastName;
    }
    let fullName1 = buildname('hello'); // error 参数过少
    let fullName2 = buildname('hello', 'world'); // helloworld
    let fullName3 = buildname('hello', 'world', 'okok'); // error 参数过多
    let fullName4 = buildname(undefined, 'world'); // willworld
}

//  剩余参数

{
    function buildName(firstName: string, ...restName: string[]) {
        return firstName + restName.join(',');
    }
    let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
}

// this 和箭头函数
{
    let deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        createCardPicker: function () {
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);
                return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
            }
        }
    }
    let cardPicker = deck.createCardPicker();
    let pickedCard = cardPicker();
    console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}

{
    interface Card {
        suit: string;
        card: number;
    }
    interface Deck {
        suits: string[];
        cards: number[];
        createCardPicker(this: Deck): () => Card;
    }
    let deck: Deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        createCardPicker: function () {
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);
                // 此时 this 为 Deck 类型
                return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
            }
        }
    }
    let cardPicker = deck.createCardPicker();
    let pickedCard = cardPicker();
    console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}

// this 参数在回调函数里
{
    interface UIElement {
        addClickListener(onclick: (this: void, e: Event) => void): void;
    }
    class Handler {
        info: string;
        onClickGood = (e: Event) => { this.info = e.message; }
    }
    let h = new Handler();
    uiElement.addClickListener(h.onClickGood);
}


// 重载
{
    let suits = ["hearts", "spades", "clubs", "diamonds"];
    // 如果传入的是数组对象，那么返回数值
    function pickCard(x: { suit: string; card: number }[]): number;
    // 如果传入的是数组，返回一个对象
    function pickCard(x: number): { suit: string; card: number };
    // 该函数并不是重载列表的一部分，pickCard 只有两个重载
    function pickCard(x: any) {
        if (typeof x == 'object') {
            let pickedCard = Math.floor(Math.random() * x.length);
            return pickedCard;
        } else if (typeof x == 'number') {
            let pickedSuit = Math.floor(x / 13);
            return { suit: suits[pickedSuit], card: x % 13 };
        }
    }

    let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
    let pickCard1 = myDeck[pickCard(myDeck)];
    console.log(`card: ${pickCard1.card}, suit: ${pickCard1.suit}`); //card: 2, suit: diamonds
    let pickCard2 = pickCard(15);
    console.log(`card: ${pickCard2.card}, suit: ${pickCard2.suit}`); //card: 2, suit: spades
}

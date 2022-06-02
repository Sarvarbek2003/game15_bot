const { type } = require('express/lib/response');
const { clear } = require('forever/lib/forever/cli');
const TelegramBot = require('node-telegram-bot-api');
const token = '5104424433:AAHqSHJWUJvAvGlQV4A4hBMcFarH6DZAPGY';
const bot = new TelegramBot(token, {polling: true});
let setINT 
bot.on('text', msg => {
    if (['/start','/restart','/game'].includes(msg.text)){
        clearInterval(setINT)
        bot.sendMessage(msg.chat.id,"00:00").then(data => {
            bot.sendMessage(msg.chat.id,"👆 Vaqt shuncha bo'ldi",{
                reply_markup: {
                    inline_keyboard:[
                        [{text: 'Start', callback_data: 'start'}]
                    ]
                }
            })
        })
    } 
})


bot.on('callback_query', msg => {
    let key = msg.message.reply_markup.inline_keyboard
    bot.editMessageReplyMarkup({
        inline_keyboard: [...key].length ==  4 ? (chek(key, msg.data) == true ? [[{text:'Yutdingiz', callback_data:'yutuq'}]] : chek(key, msg.data)) : random(15,msg)
    },{
        chat_id: msg.from.id,
        message_id: msg.message.message_id,
    })
   
})



function random(n, msg){
    n++
    let arr = [];
    for (let i = 1; i<=n; ){
        let random = (0 + Math.random() * n | 0);
        if(!arr.includes(random) && arr.length <= n){
            arr.push(random);
            i+=1;
        }
    }
    let arr1 = []
    let arr2 = []
    arr.map((el, index1) => {
        if(arr1.length < 3){
            arr1.push({text: `${el == 0 ? '⭕️' : el}` , callback_data: index1})
        } else {
            arr1.push({text: `${el == 0 ? '⭕️' : el}` , callback_data: index1})
            arr2.push(arr1)
            arr1 = []
        }
    }) 
    let time = '0'
    let soat = '0' 
    setINT = setInterval(() => {
        if(time < 59){
            time++ 
        } else {
            time = '0'
            soat++
        }
        bot.editMessageText(`${`${soat}`.padStart(2, '0')}:${`${time}`.padStart(2, '0')}`,{
            chat_id: msg.from.id,
            message_id: msg.message.message_id -1 ,
        })
    }, 1000);
    return arr2
}

let arr = [
    [
      { text: '11', callback_data: '0' },
      { text: '7', callback_data: '1' },
      { text: '9', callback_data: '2' },
      { text: '2', callback_data: '3' }
    ],
    [
      { text: '5', callback_data: '4' },
      { text: '4', callback_data: '5' },
      { text: '10', callback_data: '6' },
      { text: '6', callback_data: '7' }
    ],
    [
      { text: '15', callback_data: '8' },
      { text: '8', callback_data: '9' },
      { text: '12', callback_data: '10' },
      { text: '1', callback_data: '11' }
    ],
    [
      { text: '14', callback_data: '12' },
      { text: '3', callback_data: '13' },
      { text: '13', callback_data: '14' },
      { text: '⭕️', callback_data: '15' }
    ]
]
let arr1 = [
    [
      { text: '1', callback_data: '0' },
      { text: '2', callback_data: '1' },
      { text: '3', callback_data: '2' },
      { text: '4', callback_data: '3' }
    ],
    [
      { text: '5', callback_data: '4' },
      { text: '6', callback_data: '5' },
      { text: '7', callback_data: '6' },
      { text: '8', callback_data: '7' }
    ],
    [
      { text: '9', callback_data: '8' },
      { text: '10', callback_data: '9' },
      { text: '11', callback_data: '10' },
      { text: '12', callback_data: '11' }
    ],
    [
      { text: '13', callback_data: '12' },
      { text: '14', callback_data: '13' },
      { text: '15', callback_data: '14' },
      { text: '⭕️', callback_data: '15' }
    ]
]

function chek (array,index){
    let key = check(array,index)[0]
    let arr = array.flat()
    arr.forEach(el => {
        if(el == key){
            arr.map(e => {
                if(e.callback_data == index){
                    el.text = e.text
                    e.text = '⭕️'
                }
            })
        }
    })
    let a = arr.map((el, index) => el.text == index + 1)
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    if(countOccurrences(a,true) == 15 ) return true
    let arr1 = []
    let arr2 = []
    arr.map((el, index1) => {
        if(arr1.length < 3){
            arr1.push(el)
        } else {
            arr1.push(el)
            arr2.push(arr1)
            arr1 = []
        }
    }) 
    return arr2
}



function check(array, index){
    let arr = array.flat()
    if(index == 0){
        let a = arr.filter(e => {
            if(['1','4'].includes(e.callback_data) && e.text == '⭕️') return true
        })
        return a
    }
    else if (index == 1){
        let a = arr.filter(e => {
            if(['0', '2', '5'].includes(e.callback_data) && e.text == '⭕️') return true
        })
        return a
    }
    else if (index == 2){
        let a = arr.filter(e => {
            if(['1','6','3'].includes(e.callback_data) && e.text == '⭕️') return true
        })
        return a
    }
    else if (index == 3){
        let a = arr.filter(e => {
            if(['2','7'].includes(e.callback_data) && e.text == '⭕️') return true
        })
        return a
    }
    else if (index == 4){
        let a = arr.filter(e => {
            if(['0', '5', '8'].includes(e.callback_data) && e.text == '⭕️') return true
        })
        return a
    }
    else if (index == 5){ 
        let a = arr.filter(e => {
            if(['1', '4', '9', '6'].includes(e.callback_data) && e.text == '⭕️') return true
        })
        return a
    }
    else if (index == 6){
        let a = arr.filter(e => {
            if(['2', '5', '7', '10'].includes(e.callback_data) && e.text == '⭕️') return true
        })
        return a
    }
    else if (index == 7){
        let a = arr.filter(e => {
            if(['3', '6', '11'].includes(e.callback_data) && e.text == '⭕️') return true
        })
        return a
    }
    else if (index == 8){
        let a = arr.filter(e => {
            if(['4', '9', '12'].includes(e.callback_data) && e.text == '⭕️') return true
        })
        return a
    }
    else if (index == 9){
        let a = arr.filter(e => {
            if(['5', '8', '10', '13'].includes(e.callback_data) && e.text == '⭕️') return true
        })
        return a
    }
    else if (index == 10){
        let a = arr.filter(e => {
            if(['9', '6', '11', '14'].includes(e.callback_data) && e.text == '⭕️') return true
        })
        return a
    }
    else if (index == 11){
        let a = arr.filter(e => {
            if(['10', '7', '15'].includes(e.callback_data) && e.text == '⭕️') return true 
        })
        return a
    }
    else if (index == 12){
        let a = arr.filter(e => {
            if(['8', '13'].includes(e.callback_data) && e.text == '⭕️') return true
        })
        return a
    }
    else if (index == 13){
        let a = arr.filter(e => {
            if(['12', '9', '14'].includes(e.callback_data) && e.text == '⭕️') return true
        })
        return a
    }
    else if (index == 14){
        let a = arr.filter(e => {
            if(['13', '10', '15'].includes(e.callback_data) && e.text == '⭕️') return true
        })
        return a
    }
    else if (index == 15){
        let a = arr.filter(e => {
            if(['14', '11'].includes(e.callback_data) && e.text == '⭕️') return true
        })
        return a
    }
      
}



// 0 >> 1 4 
// 1 >> 0 2 5 
// 2 >> 1 6 3   
// 3 >> 2 7 
// 4 >> 0, 5, 8 
// 5 >> 1, 4, 9, 6 
// 6 >> 2, 5, 7, 10
// 7 >> 3, 6, 11 
// 8 >> 4, 9, 12 
// 9 >> 5, 8, 13, 10
// 10 >> 9, 6, 11, 14
// 11 >> 10, 7, 15
// 12 >> 8, 13
// 13 >> 12, 9, 14 
// 14 >> 13, 10, 15
// 15 >> 14, 11
  
// 0   1   2   3   

// 4   5   6   7   

// 8   9   10  11  

// 12  13  14  15
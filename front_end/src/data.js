let Data = {
    PdctItem :[
        { 
            id:0,
            pdct_type:'綠 茶',
            pdct_name:'杉林溪無毒茶美學禮盒2罐組',
            pdct_price: 1320,
            pdct_amount:'300g/2罐',
            pdct_img:'images/t1.jpg'
        },
        {
            id:1,
            pdct_type:'烏 龍 茶',
            pdct_name:'無毒『輕焙火』杉林溪烏龍茶葉1罐組',
            pdct_price: 620,
            pdct_amount:'150g/1罐',
            pdct_img:'images/t2.jpg'
        },
        {
            id:2,
            pdct_type:'烏 龍 茶',
            pdct_name:'杉林溪牡丹烏龍茶禮盒2罐組',
            pdct_price: 790,
            pdct_amount:'300g/2罐',
            pdct_img:'images/t3.gif'
        },
        {
            id:3,
            pdct_type:'烏 龍 茶',
            pdct_name:'阿里山花香韻美烏龍茶葉2罐組',
            pdct_price: 490,
            pdct_amount:'300g/2罐',
            pdct_img:'images/t4.jpg'
        },
        {
            id:4,
            pdct_type:'紅 茶',
            pdct_name:'焦糖蜜香紅茶6包組',
            pdct_price: 920,
            pdct_amount:'180g/6包',
            pdct_img:'images/t5.jpg'
        },
        {
            id:5,
            pdct_type:'紅 茶',
            pdct_name:'花果艷香有機紅茶高山茶葉4包組',
            pdct_price: 550,
            pdct_amount: '48g/4包',
            pdct_img:'images/t6.jpg'
        },
    ],
    set_shipng_fee: 120,
    Userdata:[
            {
                Name:'陳小明',
                Phone:'0911-234567',
                Email:'test_u1@testmail.com',
                Address:'台中市中區信義路38巷112號'
            }
    ],
    userOrder_0:[
        {
            userdata:[
                {
                    userID:'test_user1',
                    userPWD:'test_user1',
                 },
                 {
                     Name:'陳小明',
                     Phone:'0911-234567',
                     Email:'test_u1@testmail.com',
                     Address:'台中市中區信義路38巷112號'
                 }
             ],
            order_id:'TS0000001',
            order_date:'2020/10/22 18:45',
            ID_Amount:[
                [1,0],[5,0],[3,0]
            ],
            shipping_fee:100,
            total_bill:0,
            pamnt_type:'貨到付款',
            recv_time:null,
            recv_info:[],
            pamnt_info:'貨到付款',
            shipg_status:'未出貨',
            order_check:'',
        }
    ],
    userOrder:[
        {
            userdata:[
                {
                    userID:'test_user1',
                    userPWD:'test_user1',
                 },
                 {
                     Name:'陳小明',
                     Phone:'0911-234567',
                     Email:'test_u1@testmail.com',
                     Address:'台中市中區信義路38巷112號'
                 }
             ],
            order_id:'TS0000001',
            order_date:'2020/10/22 18:45',
            ID_Amount:[
                [{
                    id:1,
                    pdct_type:'烏 龍 茶',
                    pdct_name:'無毒『輕焙火』杉林溪烏龍茶葉1罐組',
                    pdct_price: 620,
                    pdct_amount:'150g/1罐',
                    pdct_img:'images/t2.jpg'
                },1],
                [{
                    id:5,
                    pdct_type:'紅 茶',
                    pdct_name:'花果艷香有機紅茶高山茶葉4包組',
                    pdct_price: 550,
                    pdct_amount: '48g/4包',
                    pdct_img:'images/t6.jpg'
                },1],
                [{
                    id:3,
                    pdct_type:'烏 龍 茶',
                    pdct_name:'阿里山花香韻美烏龍茶葉2罐組',
                    pdct_price: 490,
                    pdct_amount:'300g/2罐',
                    pdct_img:'images/t4.jpg'
                },1]
            ],
            shipping_fee:100,
            total_bill:1760,
            pamnt_type:'貨到付款',
            recv_time:null,
            recv_info:[],
            pamnt_info:'貨到付款',
            shipg_status:'未出貨',
            order_check:'',
        },
        {
            userdata:[
                {
                    userID:'test_user2',
                    userPWD:'test_user2',
                 },
                 {
                     Name:'王小華',
                     Phone:'0988-765432',
                     Email:'test_u2@testmail.com',
                     Address:'新竹市中山區信義路38巷112號'
                 }
             ],
            order_id:'TS0000002',
            order_date:'2020/08/15 18:45',
            ID_Amount:[
                [{
                    id:4,
                    pdct_type:'紅 茶',
                    pdct_name:'焦糖蜜香紅茶6包組',
                    pdct_price: 920,
                    pdct_amount:'180g/6包',
                    pdct_img:'images/t5.jpg'
                },1],
                [{
                    id:2,
                    pdct_type:'烏 龍 茶',
                    pdct_name:'杉林溪牡丹烏龍茶禮盒2罐組',
                    pdct_price: 790,
                    pdct_amount:'300g/2罐',
                    pdct_img:'images/t3.gif'
                },1]
            ],
            shipping_fee:100,
            total_bill:1810,
            pamnt_type:'帳戶匯款',
            recv_time:null,
            recv_info:[],
            pamnt_info:'',
            shipg_status:'未出貨',
            order_check:'付款確認-訂單處理中',
        },

    ]

};

export default Data;
/* Client view model com padrão VueJS */

var credentialsViewModel = new Vue({
    el: '#bitfinexCredentialDiv',
    data: { 
        Key: '',
        Secret: ''
    }
});

var orderBookViewModel = new Vue({
    el: '#orderBookDiv',
    data: { 
        bids: new Array(),
        asks: new Array()
    },
    methods: {
        setItems: function (orderbook) {
            this.bids = orderbook.bid;
            this.asks = orderbook.ask;
            this.bids = this.sortByPrice(this.bids);
            this.asks = this.sortByPrice(this.asks);
        },
        addItem: function (price, count, amount) {
            this.items.push({PRICE: price, COUNT: count, AMOUNT: amount});
            this.items = this.sortByPrice(this.items);
        },
        // addItems: function (arr) {
        //     [].push.apply(this.items, arr);
        //     this.items = this.sortByPrice(this.items);
        // },
        sortByPrice: function(arr) {
            return arr.sort(function(a, b){ return b.PRICE - a.PRICE });
        },
        sortById: function(arr) {
            return arr.sort(function(a, b){ return b._id - a._id });
        },
    }
});














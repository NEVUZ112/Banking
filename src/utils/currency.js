const formatter = new Intl.NumberFormat('uz',{style:'currency',currency:'UZS'})
// const formatter = new Intl.NumberFormat('ru',{style:'currency',currency:'RUB'})
// const formatter = new Intl.NumberFormat('en',{style:'currency',currency:'USD'})

export function currency(sum){
    return formatter.format(sum)
}
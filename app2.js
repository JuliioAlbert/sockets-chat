const heroes= [
    {
        id: 1,
        name: 'Batman',
        owner: 'DC'
    },
    {
        id: 2,
        name: 'Spiderman',
        owner: 'Marvel'
    },
    {
        id: 3,
        name: 'Superman',
        owner: 'DC'
    },
    {
        id: 4,
        name: 'Flash',
        owner: 'DC'
    },
    {
        id: 5,
        name: 'Wolverine',
        owner: 'Marvel'
    },
];

//find Solo busca uno 
const heroe = (id)=> {
    return heroes.filter(heroe => heroe.id !== id);
}
console.log(heroe(1));


//filter me trae todos los que cumplan con la condicion 
const owner = (owner) => {
    return heroes.filter(heroe => heroe.owner === owner);
}

//console.log(owner('Marvel'));
//const heroess = heroes.filter(heroe => heroe.owner === 'Marvel');






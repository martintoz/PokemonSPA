import React from 'react';
import { configure, shallow, mount } from 'enzyme';
// import { addTodo } from '../../actions';
import configureStore from "redux-mock-store";
import { Provider } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Crear, { validate } from './Crear.js';

configure({ adapter: new Adapter() });

describe('<Crear />', () => {

    const state = {
        types: [
            {
                id: 2,
                name: 'fighting'
            },
            {
                id: 6,
                name: 'rock'
            },
            {
                id: 11,
                name: 'water'
            },
            {
                id: 16,
                name: 'dragon'
            },
            {
                id: 3,
                name: 'flying'
            },
            {
                id: 8,
                name: 'ghost'
            },
            {
                id: 13,
                name: 'electric'
            },
            {
                id: 18,
                name: 'fairy'
            },
            {
                id: 5,
                name: 'ground'
            },
            {
                id: 7,
                name: 'bug'
            },
            {
                id: 12,
                name: 'grass'
            },
            {
                id: 17,
                name: 'dark'
            },
            {
                id: 4,
                name: 'poison'
            },
            {
                id: 10,
                name: 'fire'
            },
            {
                id: 15,
                name: 'ice'
            },
            {
                id: 10002,
                name: 'shadow'
            },
            {
                id: 1,
                name: 'normal'
            },
            {
                id: 9,
                name: 'steel'
            },
            {
                id: 14,
                name: 'psychic'
            },
            {
                id: 10001,
                name: 'unknown'
            }
        ]
    }
    let wrapper;
    let store;
    describe('Estructura', () => {
        const mockStore = configureStore();
        store = mockStore(state);
        beforeEach(() => {
            wrapper = mount(
                <Provider store={store}>
                    <Crear />
                </Provider>);
        })
        it('Renderiza un <form>  con el método POST a /pokemons', () => {
            expect(wrapper.find('form')).toHaveLength(1)
            expect(wrapper.find('form[method="POST"]')).toHaveLength(1);
            expect(wrapper.find('form[action="/pokemons"]')).toHaveLength(1);
        })
        it('Renderiza un label con el texto igual a "Nombre:"', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(0).text()).toEqual('Nombre:');
        })
        it('Renderiza un input con la propiedad "name" igual a "name"', () => {
            expect(wrapper.find('input[name="name"]')).toHaveLength(1);
        })
        it('Renderiza un label con el texto igual a "Imagen:"', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(1).text()).toEqual('Imagen:');
        })
        it('Renderiza un label con el texto igual a "Tipo:"', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(2).text()).toEqual('Tipo:');
        })
        it('Renderiza un label con el texto igual a "Tipo 2:"', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(3).text()).toEqual('Tipo 2:');
        })
        it('Renderiza un option para cada Tipo (20 en total), un option para cada Tipo2 y 1 option sin tipo para Tipo2 (21 en total', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('option[name="type"]')).toHaveLength(20)
            expect(wrapper.find('option[name="type2"]')).toHaveLength(20)
            expect(wrapper.find('option[name="sinTipo"]')).toHaveLength(1)
        })
        it('Renderiza un label con el texto igual a "Vida:"', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(4).text()).toEqual('Vida:');
        })
        it('Renderiza un input de tipo "number" con la propiedad "name" igual a "hp", y un mínimo de 1', () => {
            expect(wrapper.find('input[name="hp"]')).toHaveLength(1);
            expect(wrapper.find('input[name="hp"][type="number"]')).toHaveLength(1);
            expect(wrapper.find('input[name="hp"][type="number"][min="1"]')).toHaveLength(1);
        })
        it('Renderiza un label con el texto igual a "Ataque:"', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(5).text()).toEqual('Ataque:');
        })
        it('Renderiza un input de tipo "number" con la propiedad "name" igual a "attack", y un mínimo de 1', () => {
            expect(wrapper.find('input[name="attack"]')).toHaveLength(1);
            expect(wrapper.find('input[name="attack"][type="number"]')).toHaveLength(1);
            expect(wrapper.find('input[name="attack"][type="number"][min="1"]')).toHaveLength(1);
        })
        it('Renderiza un label con el texto igual a "Defensa:"', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(6).text()).toEqual('Defensa:');
        })
        it('Renderiza un input de tipo "number" con la propiedad "name" igual a "defense", y un mínimo de 1', () => {
            expect(wrapper.find('input[name="defense"]')).toHaveLength(1);
            expect(wrapper.find('input[name="defense"][type="number"]')).toHaveLength(1);
            expect(wrapper.find('input[name="defense"][type="number"][min="1"]')).toHaveLength(1);
        })
        it('Renderiza un label con el texto igual a "Velocidad:"', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(7).text()).toEqual('Velocidad:');
        })
        it('Renderiza un input de tipo "number" con la propiedad "name" igual a "speed", y un mínimo de 1', () => {
            expect(wrapper.find('input[name="speed"]')).toHaveLength(1);
            expect(wrapper.find('input[name="speed"][type="number"]')).toHaveLength(1);
            expect(wrapper.find('input[name="speed"][type="number"][min="1"]')).toHaveLength(1);
        })
        it('Renderiza un label con el texto igual a "Altura (cm):"', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(8).text()).toEqual('Altura (cm):');
        })
        it('Renderiza un input de tipo "number" con la propiedad "name" igual a "height", y un mínimo de 1', () => {
            expect(wrapper.find('input[name="height"]')).toHaveLength(1);
            expect(wrapper.find('input[name="height"][type="number"]')).toHaveLength(1);
            expect(wrapper.find('input[name="height"][type="number"][min="1"]')).toHaveLength(1);
        })
        it('Renderiza un label con el texto igual a "Peso (kg):"', () => {
            // El orden en el que se encuentran los Labels es importante.
            expect(wrapper.find('label').at(9).text()).toEqual('Peso (kg):');
        })
        it('Renderiza un input de tipo "number" con la propiedad "name" igual a "weight", y un mínimo de 0.1', () => {
            expect(wrapper.find('input[name="weight"]')).toHaveLength(1);
            expect(wrapper.find('input[name="weight"][type="number"]')).toHaveLength(1);
            expect(wrapper.find('input[name="weight"][type="number"][min="0.1"]')).toHaveLength(1);
        })
        it('Renderiza un boton con el "type" "submit"', () => {
            expect(wrapper.find('button[type="submit"]')).toHaveLength(1)
        })
    })

    describe('Manejo de inputs con estado', () => {
        let useState, useStateSpy;
        beforeEach(() => {
            useState = jest.fn();
            useStateSpy = jest.spyOn(React, 'useState')
            useStateSpy.mockImplementation((init) => [init, useState]);
            const mockStore = configureStore();
            store = mockStore(state);
            wrapper = mount(<Provider store={store}>
                <Crear />
            </Provider>)
        });

        describe("Name input", () => {

            it('El form deberia cambiar de estado cuando escriban en el input de Nombre', () => {
                // deberías tener un único estado, no uno por cada input
                wrapper.find('input[name="name"]').simulate('change', { target: { name: 'name', value: 'Hauche' } });
                expect(useState).toHaveBeenCalledWith({ "name": "Hauche", img:"", "attack": 0, "defense": 0, "height": 0, "hp": 0, "speed": 0, "weight": 0 });
            });
        });

        describe("Attack input", () => {

            it('El form deberia cambiar de estado cuando escriban en el input de Ataque', () => {
                // deberías tener un único estado, no uno por cada input
                wrapper.find('input[name="name"]').simulate('change', { target: { name: 'attack', value: '27' } });
                expect(useState).toHaveBeenCalledWith({ "name": "", img:"", "attack": "27", "defense": 0, "height": 0, "hp": 0, "speed": 0, "weight": 0 });
            });
        });

        describe("Defense input", () => {

            it('El form deberia cambiar de estado cuando escriban en el input de Defensa', () => {
                // deberías tener un único estado, no uno por cada input
                wrapper.find('input[name="name"]').simulate('change', { target: { name: 'defense', value: '27' } });
                expect(useState).toHaveBeenCalledWith({ "name": "",img:"", "attack": 0, "defense": '27', "height": 0, "hp": 0, "speed": 0, "weight": 0 });
            });
        });

        describe("Height input", () => {

            it('El form deberia cambiar de estado cuando escriban en el input de Defensa', () => {
                // deberías tener un único estado, no uno por cada input
                wrapper.find('input[name="name"]').simulate('change', { target: { name: 'height', value: '27' } });
                expect(useState).toHaveBeenCalledWith({ "name": "",img:"", "attack": 0, "defense": 0, "height": '27', "hp": 0, "speed": 0, "weight": 0 });
            });
        });

        describe("HP input", () => {

            it('El form deberia cambiar de estado cuando escriban en el input de Vida', () => {
                // deberías tener un único estado, no uno por cada input
                wrapper.find('input[name="name"]').simulate('change', { target: { name: 'hp', value: '27' } });
                expect(useState).toHaveBeenCalledWith({ "name": "",img:"", "attack": 0, "defense": 0, "height": 0, "hp": '27', "speed": 0, "weight": 0 });
            });
        });

        describe("Speed input", () => {

            it('El form deberia cambiar de estado cuando escriban en el input de Velocidad', () => {
                // deberías tener un único estado, no uno por cada input
                wrapper.find('input[name="name"]').simulate('change', { target: { name: 'speed', value: '27' } });
                expect(useState).toHaveBeenCalledWith({ "name": "",img:"", "attack": 0, "defense": 0, "height": 0, "hp": 0, "speed": '27', "weight": 0 });
            });
        });

        describe("Weight input", () => {

            it('El form deberia cambiar de estado cuando escriban en el input de Peso', () => {
                // deberías tener un único estado, no uno por cada input
                wrapper.find('input[name="name"]').simulate('change', { target: { name: 'weight', value: '27' } });
                expect(useState).toHaveBeenCalledWith({ "name": "",img:"", "attack": 0, "defense": 0, "height": 0, "hp": 0, "speed": 0, "weight": '27' });
            });
        });
    });
});
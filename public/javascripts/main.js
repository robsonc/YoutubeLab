(function () {

    angular.module('youtubeLab', []);

    angular.module('youtubeLab').controller('IndexController', function IndexController() {
        var vm = this;

    });

    angular.module('youtubeLab').controller('GamePlanController', function GamePlanController() {
        var vm = this;

        vm.pageTitle = 'Game Plan';

        vm.data = [
            {
                description: 'I have closed guard',
                techniques: [
                    { name: 'Scissor sweep' },
                    { name: 'Da firma sweep' },
                    { name: 'Open guard' },
                ]
            },
            {
                description: 'I have open guard',
                techniques: [
                    { name: 'Pés no quadril e mão na gola' },
                    { name: 'guarda de la riva' },
                    { name: 'Guarda aranha' },
                ]
            },
            {
                description: 'I have half guard on top',
                techniques: [
                    { name: 'Passagem deslizando joelho' },
                    { name: 'Passagem invertendo quadril' },
                    { name: 'Passagem indo pra montada' },
                ]
            },
            {
                description: 'In opponent\'s closed guard',
                techniques: [
                    { name: 'Abertura de guarda levantando' },
                    { name: 'estrangulamento amassa pão' },
                    { name: 'estrangulamento ezequiel da guarda fechada' },
                ]
            },
            {
                description: 'In opponent\'s open guard',
                techniques: [
                    { name: 'Passagem para meia guarda' },
                    { name: 'Passagem toreando' },
                    { name: 'Passagem emborcando' },
                ]
            },
            {
                description: 'I\'m on top',
                techniques: [
                    { name: 'Passagem deslizando joelho' },
                    { name: 'Passagem invertendo quadril' },
                    { name: 'Passagem indo pra montada' },
                ]
            },
            {
                description: 'All matches start standing',
                techniques: [
                    { name: 'Passagem deslizando joelho' },
                    { name: 'Passagem invertendo quadril' },
                    { name: 'Passagem indo pra montada' },
                ]
            },
            {
                description: 'Caught under top game',
                techniques: [
                    { name: 'Passagem deslizando joelho' },
                    { name: 'Passagem invertendo quadril' },
                    { name: 'Passagem indo pra montada' },
                ]
            },
            {
                description: 'I have back mount',
                techniques: [
                    { name: 'Passagem deslizando joelho' },
                    { name: 'Passagem invertendo quadril' },
                    { name: 'Passagem indo pra montada' },
                ]
            },
            {
                description: 'I\'m in a half guard bottom',
                techniques: [
                    { name: 'Passagem deslizando joelho' },
                    { name: 'Passagem invertendo quadril' },
                    { name: 'Passagem indo pra montada' },
                ]
            },
            {
                description: 'I have mount',
                techniques: [
                    { name: 'Passagem deslizando joelho' },
                    { name: 'Passagem invertendo quadril' },
                    { name: 'Passagem indo pra montada' },
                ]
            },
            {
                description: 'I\'m mounted',
                techniques: [
                    { name: 'Passagem deslizando joelho' },
                    { name: 'Passagem invertendo quadril' },
                    { name: 'Passagem indo pra montada' },
                ]
            },
            {
                description: 'My back is taken',
                techniques: [
                    { name: 'Passagem deslizando joelho' },
                    { name: 'Passagem invertendo quadril' },
                    { name: 'Passagem indo pra montada' },
                ]
            },
        ];
    });
})();
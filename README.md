# Extensão para Chromium: FiltroSteam2.0

## Descrição

Esta extensão para navegadores baseados em Chromium coleta dados do Marketplace da Steam e filtra os itens com assimetria bullish, apresentando uma lista ordenada dos itens mais lucrativos para os menos lucrativos. O objetivo é auxiliar os usuários na identificação de oportunidades de compra e revenda no Marketplace da Steam.

## Funcionalidades

- Coleta de dados do Marketplace da Steam.
- Filtro de itens com base em critérios de lucratividade.
- Exibição de uma lista ordenada dos itens filtrados.
- Interface amigável para configuração de parâmetros de pesquisa.

## Instalação

1. Clone este repositório.
    ```bash
    git clone https://github.com/GiovanneBohms/FiltroSteam2.0.git
    ```

2. Abra o Chrome e vá para `chrome://extensions/`.

3. Ative o "Modo de desenvolvedor" no canto superior direito.

4. Clique em "Carregar sem compactação" e selecione a pasta do repositório clonado.
5. Click no icone da extensão para ativar e desativá-la: ![image](https://github.com/GiovanneBohms/FiltroSteam2.0/assets/13811860/e21ca124-40e6-42cb-a90f-e7cb029d49c1)


## Uso

### Interface de Configuração

A interface de configuração permite definir os parâmetros de pesquisa para a coleta de dados.
![image](https://github.com/GiovanneBohms/FiltroSteam2.0/assets/13811860/64e6346e-5278-4d70-9899-8847ffa6f392)

### Configuração de Parâmetros
1. `Capital de Trade`: Essa informação é apenas para que a extensão saiba a quantidade de itens a sugerir para compra.
2. `Quantidade de itens para pesquisar`: Quantidade total de itens a serem filtrados.
3. `Opertas Mínimas`: Quantidade de itens mínimos que aparece ao lado do valor dos itens, é o primeiro filtro de pesquisa de acordo com a estratégia de trading do usuário.
4. `Intervalo Em Horas`: Define quais as ultimas horas do gráfico a serem pesquisados, recomendado definir a 336 horas que são as duas últimas semanas.
5. `Tempo de Compra`: Para o gerenciamento de risco: quanto maior o tempo, mais lucrativo será o item, mas menos provável que a compra ocorra. Recomendo definir entre 48 e 72 horas
6. `Volume Médio de Negociação por Hora`: define qual o volume médio por hora mínimo dos itens, é o segundo filtro de pesquisa e funciona de acordo com a estratégia de trading do usuário.
7. `Preço Mínimo e Preço Máximo`: Define o intervalo de preço que o usuário tem interesse, é o terceiro filtro e depente da estratégia de trading utilizado.

8. Após configurar os parâmetros click no botão `Coletar Dados`

### Interface de Resultados
Após concluir a pesquisa a seguinte interface irá surgir:
![image](https://github.com/GiovanneBohms/FiltroSteam2.0/assets/13811860/fa40dc54-4a00-4e5b-9e21-90dd54cfe5ea)
1. Após a raspagem de dados, as informações ficarão salvas no navegador, para visualizá-las novamente basta clickar no botão

   `Utilizar Dados Já Coletados`
4. Quanto maior o parâmetro `Tempo de Compra`, maior será o lucro presumido no futuro.

### O que fazer com as informações:
Nos resultados haverá as seguintes informações principais:

![image](https://github.com/GiovanneBohms/FiltroSteam2.0/assets/13811860/3f6e284b-3e98-4252-a33e-019e8e0d4a51)


1. `Sell:` Valor a vender
2. `0a0:` Valor de saída para caso o item deixe de ser lucrativo devido a agressões no book por drop de itens
3. `Buy:` Valor de compra
4. `Qnt:` Quantidade de itens que você pode comprar, isso é calculado a partir do parâmetro `Capital de Trade`
5. `Vol:` Volume dos itens por hora
6. `Lucro:` Lucro presumido, nunca coloque ordens de compra a itens que não possuem lucro presumido acima de 35%

 ## Resultados com 1 ano de uso

![image](https://github.com/GiovanneBohms/FiltroSteam2.0/assets/13811860/2d36860f-5dea-4993-871d-019d66f8be6c)

## Transações Realizadas até o último update deste Readme

![image](https://github.com/GiovanneBohms/FiltroSteam2.0/assets/13811860/04b35a57-0601-44fe-ac95-3cf23e8bc0f0)


## Compra e Revenda de Itens
![image](https://github.com/GiovanneBohms/FiltroSteam2.0/assets/13811860/cd7d6a0b-a3fe-4ed2-a0ac-d4fadafa830d)

![image](https://github.com/GiovanneBohms/FiltroSteam2.0/assets/13811860/98ac2329-316f-4691-a000-da71ebebaf85)




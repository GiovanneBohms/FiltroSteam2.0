obs: Esse foi o meu primeiro projeto, então não há boas práticas de programação 💔
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
5. Acesse o link do MarketPlace: https://steamcommunity.com/market/
6. Click no ícone da extensão para ativar e desativá-la:
 ![image](https://github.com/GiovanneBohms/FiltroSteam2.0/assets/13811860/e21ca124-40e6-42cb-a90f-e7cb029d49c1)

## Uso

### Interface de Configuração

A interface de configuração permite definir os parâmetros de pesquisa para a coleta de dados.
![image](https://github.com/GiovanneBohms/FiltroSteam2.0/assets/13811860/db173a82-0f6b-4238-8bd0-24400f55b84d)

### Configuração de Parâmetros
1. `Capital de Trade`: Essa informação é apenas para que a extensão saiba a quantidade de itens a sugerir para compra.
2. `Quantidade de itens para pesquisar`: Quantidade total de itens a serem filtrados.
3. `Ofertas Mínimas e Máximas`: Quantidade de itens mínimo e máximo que aparece ao lado do valor dos itens, é o primeiro filtro de pesquisa de acordo com a estratégia de trading do usuário.
4. `Intervalo Em Horas`: Define quais as últimas horas do gráfico a serem pesquisadas, recomendado definir a 336 horas que são as duas últimas semanas.
5. `Tempo de Compra`: Para o gerenciamento de risco: quanto maior o tempo, mais lucrativo será o item, mas menos provável que a compra ocorra. Recomendo definir entre 48 e 72 horas.
6. `Volume Médio de Negociação por Hora`: Define qual o volume médio por hora mínimo dos itens, é o segundo filtro de pesquisa e funciona de acordo com a estratégia de trading do usuário.
7. `Preço Mínimo e Preço Máximo`: Define o intervalo de preço que o usuário tem interesse, é o terceiro filtro e depende da estratégia de trading utilizado.
8. Após configurar os parâmetros, clique no botão `Coletar Dados`.

### Interface de Resultados
Após concluir a pesquisa, a seguinte interface irá surgir:
![image](https://github.com/GiovanneBohms/FiltroSteam2.0/assets/13811860/fa40dc54-4a00-4e5b-9e21-90dd54cfe5ea)
1. Após a raspagem de dados, as informações ficarão salvas no navegador. Para visualizá-las novamente, basta clicar no botão `Utilizar Dados Já Coletados`.
2. Quanto maior o parâmetro `Tempo de Compra`, maior será o lucro presumido no futuro.

### O que fazer com as informações:
Nos resultados haverá as seguintes informações principais:

![image](https://github.com/GiovanneBohms/FiltroSteam2.0/assets/13811860/3f6e284b-3e98-4252-a33e-019e8e0d4a51)

1. `Sell`: Valor a vender.
2. `0a0`: Valor de saída para caso o item deixe de ser lucrativo devido a agressões no book por drop de itens.
3. `Buy`: Valor de compra.
4. `Qnt`: Quantidade de itens que você pode comprar, isso é calculado a partir do parâmetro `Capital de Trade`.
5. `Vol`: Volume dos itens por hora.
6. `Lucro`: Lucro presumido. Nunca coloque ordens de compra em itens que não possuem lucro presumido acima de 35%.

## Resultados com 1 ano de uso

![image](https://github.com/GiovanneBohms/FiltroSteam2.0/assets/13811860/0d368c65-2aa9-4fd2-bef9-33058918c5b5)


## Transações Realizadas até o último update deste README

![image](https://github.com/GiovanneBohms/FiltroSteam2.0/assets/13811860/7469dca6-8494-49a3-874b-19fd6bd35d27)


## Compra e Revenda de Itens

![image](https://github.com/GiovanneBohms/FiltroSteam2.0/assets/13811860/4f6f5181-0490-461e-bfc4-a328b7c2b283)


## Últimas Atualizações
- **Parâmetro "Ofertas Máximas"**: Adicionar um filtro para definir o número máximo de ofertas exibidas para cada item. ✔
- Correção das unidades de medida na interface de pesquisa. ✔
- Cópia do saldo da carteira para capital de Trade ✔
## Próximas Atualizações
- Salvar parâmetros do último registro

### Em Consideração

- Melhorias na interface de usuário para facilitar a configuração dos parâmetros.

Mantenha-se atualizado sobre as próximas versões e melhorias seguindo este repositório e conferindo as notas de lançamento.

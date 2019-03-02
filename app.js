/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var currentScore, scores, activePlayer, gameOver;

init();

function init()
{
    currentScore = 0;
    scores=[0,0];
    activePlayer=0;
    gameOver=0;
    
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    
    document.querySelector('.dice').style.display = 'none';
}

function switchPlayer()
{
    document.querySelector('#current-' + activePlayer).textContent='0';
    document.querySelector('.dice').style.display = 'none';
    activePlayer = (activePlayer + 1)%2;
    currentScore=0;
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function rollDice()
{
    if(gameOver === 1)
        return;
    var num = Math.floor(Math.random() * 6 +1);
    
    if(num === 1)
    {
        switchPlayer();
    }
    else
    {
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + num + '.png';
        currentScore += num;
        document.querySelector('#current-' + activePlayer).textContent = currentScore;
    }
    
}

function holdScore()
{
    if(gameOver === 1)
        return;
    
    scores[activePlayer] += currentScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    if(scores[activePlayer] >= 100)
    {
        gameOver = 1;
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    }
    else
    {
        switchPlayer();
    }
}

function newGame()
{
    gameOver = 0;
    init();
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
}

document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', holdScore);
document.querySelector('.btn-new').addEventListener('click', newGame);
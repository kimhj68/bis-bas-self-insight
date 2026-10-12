(function(root){
const groups = [
 {name:'걱정·위협 민감성', code:'BIS', start:0, end:7, description:'실수·비판·안 좋은 결과를 예상할 때 걱정하거나 긴장하는 반응',limit:'불안장애 여부나 실제 위험 판단 능력을 판단하지 않습니다.'},
 {name:'보상반응성',code:'BAS · REWARD',start:7,end:12,description:'좋은 결과나 기회에서 기쁨·흥분·활력을 느끼는 반응',limit:'행복의 전체 수준이나 우울증 여부를 판단하지 않습니다.'},
 {name:'목표추구',code:'BAS · DRIVE',start:12,end:16,description:'원하는 것을 얻기 위해 노력하고 적극적으로 행동하는 경향',limit:'성실성 전체, 능력이나 실제 성공 가능성을 판단하지 않습니다.'},
 {name:'재미추구',code:'BAS · FUN',start:16,end:20,description:'새로운 즐거움과 자극을 찾고 즉흥적으로 행동하는 경향',limit:'창의성이나 충동조절 문제 여부를 판단하지 않습니다.'}
];
const labels=['전혀 그렇지 않다','별로 그렇지 않다','대체로 그렇다','매우 그렇다'];
function score(answers){
 if(!Array.isArray(answers)||answers.length!==20||Array.from(answers).some(v=>!Number.isInteger(v)||v<1||v>4))throw new Error('20문항 모두 1~4로 응답해 주세요.');
 return groups.map(g=>{const values=answers.slice(g.start,g.end).map((v,i)=>[4,6].includes(g.start+i)?5-v:v); const sum=values.reduce((a,b)=>a+b,0);return {...g,sum,mean:sum/values.length,count:values.length};});
}
function interpretation(mean){
 if(!Number.isFinite(mean)||mean<1||mean>4)throw new Error('유효하지 않은 평균');
 if(Number.isInteger(mean))return '평균은 응답 눈금의 ‘'+labels[mean-1]+'’에 해당합니다.';
 const low=Math.floor(mean);return '평균은 응답 눈금의 ‘'+labels[low-1]+'’와 ‘'+labels[low]+'’ 사이에 있습니다.';
}
const api={groups,labels,score,interpretation};if(typeof module!=='undefined')module.exports=api;else root.BISBAS=api;
})(typeof window!=='undefined'?window:globalThis);

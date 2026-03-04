const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response return --
        .then((res) => res.json())   // promise of json data return --
        .then((json) => displayLesson(json.data));
};
const loadLevelWord=(id)=>{
    // console.log(id);
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayLevelWord(data.data))
}
const displayLevelWord=(words)=>{
    // console.log(words);
    const wordContainer=document.getElementById('word-container');
    // console.log(wordContainer);
    wordContainer.innerHTML= '';
    if(words.length == 0){
        wordContainer.innerHTML= `
         <div class="text-center col-span-full space-y-6 rounded-xl py-10">
         <img class='mx-auto' src='./assets/alert-error.png'/>
            <p class="font-bangla font-medium text-xl text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        return;
    }

//     {
//     "id": 101,
//     "level_no": 1,
//     "lessonName": "Basic Vocabulary"
// }

    words.forEach(word =>{
        console.log(word);
        const card= document.createElement('div');
        card.innerHTML=`
           <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4 min-h-[290px]">
            <h2 class="font-bold text-2xl">${word.word? word.word:'word is not found'}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>

            <div class="font-bangla font-semibold text-2xl">"${word.meaning? word.meaning :'meaning is not found'} / ${word.pronunciation? word.pronunciation : 'pronunciation is not found'}"</div>
            <div class="flex justify-between items-center">

                <button class="btn bg-[#1a91ff15] hover:bg-[#1a91ff80] "><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1a91ff15] hover:bg-[#1a91ff80] "><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>

        `;
        wordContainer.append(card);
    });
};

const displayLesson = (lessons) => {
    // console.log(lessons);

    // get the container & empty--
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    // get into every lessons---
    for (let lesson of lessons) {
        console.log(lesson);
        // create element--
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button id='lesson-btn-${lesson.level_no}' onclick="loadLevelWord('${lesson.level_no}')" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
        </button>
        `;
        // append in to container--
        levelContainer.append(btnDiv);
    }

};

loadLessons();
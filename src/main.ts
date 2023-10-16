const rock = document.querySelector('#rock') as HTMLDivElement;

rock.addEventListener( 'click', () => {
    rock.classList.remove('bg-stone-500', 'border-transparent');
    rock.classList.add('bg-stone-400', 'border-stone-200');
    paper.classList.remove('bg-stone-400', 'border-stone-200');
    scissors.classList.remove('bg-stone-400', 'border-stone-200');
    paper.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    scissors.classList.add('border-2', 'border-transparent', 'bg-stone-500');
})

const paper = document.querySelector('#paper') as HTMLDivElement;

paper.addEventListener( 'click', () => {
    paper.classList.remove('bg-stone-500', 'border-transparent');
    paper.classList.add('bg-stone-400', 'border-stone-200');
    rock.classList.remove('bg-stone-400', 'border-stone-200');
    scissors.classList.remove('bg-stone-400', 'border-stone-200');
    rock.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    scissors.classList.add('border-2', 'border-transparent', 'bg-stone-500');
})

const scissors = document.querySelector('#scissors') as HTMLDivElement;

scissors.addEventListener( 'click', () => {
    scissors.classList.remove('bg-stone-500', 'border-transparent');
    scissors.classList.add('bg-stone-400', 'border-stone-200');
    paper.classList.remove('bg-stone-400', 'border-stone-200');
    rock.classList.remove('bg-stone-400', 'border-stone-200');
    paper.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    rock.classList.add('border-2', 'border-transparent', 'bg-stone-500');
})
import './style/style.scss';
import BindEvent from './app/listeners';
import { getAnswers } from './firebase';

BindEvent.click();
BindEvent.scroll();
BindEvent.guessCharacter();
getAnswers();

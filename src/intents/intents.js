import {get_ingredient} from './ingredient_intent'
import {update_session_entity} from './setup_intent'
import {follow_up_login_request} from './setup_intent'
import {get_ingredient_list} from './ingredient-list_intent'
import {handle_get_ingredient_list} from './ingredient-list_intent'
import {getFirstStep} from'./firststep_intent'
import {getCookTime} from './cooktime_intent'
import {handle_get_cooktime} from './cooktime_intent'
import {getPrepTime} from './prep-time_intent'
import {handle_get_preptime} from './prep-time_intent'
import {getStepByIndex} from'./nextstep_intent'
import {handle_get_step_by_index} from './nextstep_intent'
import {getTotalNumberOfSteps} from './total_steps_intent'
import {handle_get_num_remaining_steps} from './total_steps_intent'
import {handle_get_ingredient} from './ingredient_intent'

module.exports = {
    get_ingredient: get_ingredient,
    update_session_entity: update_session_entity,
    follow_up_login_request: follow_up_login_request,
    get_ingredient_list: get_ingredient_list,
    getFirstStep: getFirstStep,
    getCookTime: getCookTime,
    getPrepTime: getPrepTime,
    getStepByIndex: getStepByIndex,
    getTotalNumberOfSteps: getTotalNumberOfSteps,
    handle_get_ingredient: handle_get_ingredient,
    handle_get_ingredient_list: handle_get_ingredient_list,
    handle_get_cooktime: handle_get_cooktime,
    handle_get_preptime: handle_get_preptime,
    handle_get_step_by_index: handle_get_step_by_index,
    handle_get_num_remaining_steps: handle_get_num_remaining_steps
}

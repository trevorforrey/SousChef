import {get_ingredient} from './ingredient_intent'
import {handle_update_session_entity} from './setup_intent'
import {follow_up_login_request} from './setup_intent'
import {get_ingredient_list} from './ingredient-list_intent'
import {handle_get_ingredient_list} from './ingredient-list_intent'
import {getCookTime} from './cooktime_intent'
import {handle_get_cooktime} from './cooktime_intent'
import {getPrepTime} from './prep-time_intent'
import {handle_get_preptime} from './prep-time_intent'
import {getStepByIndex} from'./nextstep_intent'
import {handle_get_step_by_index} from './nextstep_intent'
import {getTotalNumberOfSteps} from './total_steps_intent'
import {handle_get_num_remaining_steps} from './total_steps_intent'
import {handle_get_ingredient} from './ingredient_intent'
import {handle_login_request} from './login_intent'
import {handle_username_response} from './login_intent'
import {handle_recipe_response} from './login_intent'
import {handle_substitute_ingredient} from './substitute_intent'
import {handle_get_num_servings} from './get_servings_intent'
import {handle_adjust_servings} from './adjust_servings_intent'

module.exports = {
    get_ingredient: get_ingredient,
    handle_update_session_entity: handle_update_session_entity,
    follow_up_login_request: follow_up_login_request,
    get_ingredient_list: get_ingredient_list,
    getCookTime: getCookTime,
    getPrepTime: getPrepTime,
    getStepByIndex: getStepByIndex,
    getTotalNumberOfSteps: getTotalNumberOfSteps,
    handle_get_ingredient: handle_get_ingredient,
    handle_get_ingredient_list: handle_get_ingredient_list,
    handle_get_cooktime: handle_get_cooktime,
    handle_get_preptime: handle_get_preptime,
    handle_get_step_by_index: handle_get_step_by_index,
    handle_get_num_remaining_steps: handle_get_num_remaining_steps,
    handle_login_request: handle_login_request,
    handle_username_response: handle_username_response,
    handle_recipe_response: handle_recipe_response,
    handle_substitute_ingredient: handle_substitute_ingredient,
    handle_get_num_servings: handle_get_num_servings,
    handle_adjust_servings: handle_adjust_servings
};

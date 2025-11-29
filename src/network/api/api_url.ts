export const api_url = {

    //admin
    admin_login_url: "admin/login",
    forgot_password:'/auth/forgot-password',
    forgot_password_verify:"/auth/forgot-passward-verify",
    reset_password:"/auth/reset-password",
    change_password:"/auth/change-password",

    //roles
    get_roles: 'core/roles',


    //training goals and style
    get_training_goals: '/training-goals/get',
    create_training_goal: '/training-goals/create',
    update_training_goal: '/training-goals/update/',
    delete_training_goal: '/training-goals/delete/',

    create_training_style: '/training-styles/create',
    update_training_style: '/training-styles/update/',
    delete_training_style: '/training-styles/delete/',
    get_training_styles: '/training-styles/get',

    // @@home gyms
    get_home_gyms: '/training-homegyms/get',
    create_home_gym: '/training-homegyms/create',
    update_home_gym: '/training-homegyms/update/',
    delete_home_gym: '/training-homegyms/delete/',

    //subscription
    get_subscription_plan:'/plans/get',
    create_subscription_plan:'/plans/create',
    delete_subscription_plan:"/plans/delete/",
    update_subscrription_plan:"/plans/update/",



    // users api

    get_all_users:"/users/all-users"
    


}
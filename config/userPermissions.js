module.exports = {
    // user permission based on roles
    name: 'userPermissions',
    val: {
        "owner":{
            "stock" : [
                "create",
                "read",
                "update",
                "delete"
            ],
            "user" : [
                "create",
                "read",
                "update",
                "delete"
            ]
        },
        "employee":{
            "stock" : [
                "create",
                "read",
                "update",
                "delete"
            ],
            "user" : [
                "read",
            ]
        }
    }
}
$(function(){
    function changeSidebarState(iconsState){
        if (iconsState){
            $('body').addClass('sidebar-state-icons')
        } else {
            $('body').removeClass('sidebar-state-icons')
        }
    }

    $('#sidebar-state-toggle').click(function(){
        NextOneApp.toggleSidebarState(changeSidebarState);
    });

    changeSidebarState(NextOneApp.isSidebarIconsState());
});
function callmodalPlanRouteCause(){

    var modalStr = `
        <form id="formPlanRootCause" method="post" action="/user/plan-root-cause">
        
            <div id="modal-plan-root-cause" class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-fullscreen" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">Plan Root Cause</h4>
                        </div>
                        <div class="modal-body modal-body-fullscreen">
        
                            Testing content for plan route cause
        
                        </div>
                    </div>
                </div>
            </div>
        
        </form>
    `;

    return modalStr;

};
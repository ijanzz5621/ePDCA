function callmodalPlanRouteCause(){

    var modalStr = `
        <form id="formPlanRootCause" class="msform" method="post" action="/user/plan-root-cause" style="text-align:left;">
        
            <div id="modal-plan-root-cause" class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-fullscreen" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">Plan Root Cause & Why list</h4>
                        </div>
                        <div class="modal-body modal-body-fullscreen">
        
                            <div class="row">

                                <div class="col-md-12">
                                    
                                    <div id="modal-plan-root-cause-divnew" style=" display:none;">
                                        <textarea id="modal-plan-root-cause-new" style="width:100%; height:80px;font-size:18px;"></textarea>
                                        <br/>
                                        <input id="modal-plan-root-cause-btnAdd" type="button" value="Add" class="action-button" style="width:80px;margin:0;" />
                                    </div>
                                    <img id="modal-plan-root-cause-add" src="/img/add-icon.png" width="35" title="add new potential root cause" style="cursor:pointer;"/>

                                </div>

                            </div>

                            <div class="row" style="margin-top:15px;">

                                <div class="col-md-12">

                                    <div class="frame" id="basic">
                                        <ul class="clearfix">
                                            <li>0</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li>
                                            <li>10</li><li>11</li><li>12</li><li>13</li><li>14</li><li>15</li><li>16</li><li>17</li><li>18</li>
                                            <li>19</li><li>20</li><li>21</li><li>22</li><li>23</li><li>24</li><li>25</li><li>26</li><li>27</li>
                                            <li>28</li><li>29</li>
                                        </ul>
                                    </div>

                                </div>

                            </div>
        
                        </div>
                    </div>
                </div>
            </div>
        
        </form>
    `;

    return modalStr;

};
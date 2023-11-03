<div class="modal fade" id="mdlProducto" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Nuevo</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="frmproducto">
        <input type="hidden" name="hddid" id="hddid" value="">
        <div class="modal-body">
          <div class="">
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-1" aria-controls="navs-top-1" aria-selected="true">Principal</button>
              </li>
              <li class="nav-item">
                <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-2" aria-controls="navs-top-2" aria-selected="true">Características</button>
              </li>
              <li class="nav-item">
                <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-3" aria-controls="navs-top-3" aria-selected="true">Criterios de evaluación</button>
              </li>
              <li class="nav-item">
                <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-top-4" aria-controls="navs-top-4" aria-selected="true">Imagen</button>
              </li>
            </ul>
            <div class="tab-content" id="tab-content">
              <div class="tab-pane fade show active" id="navs-top-1" role="tabpanel">
                <div class="row">
                  <div class="col-3">
                    <label for="txtcodigo" class="form-label">Código</label>
                    <input type="text" id="txtcodigo" name="txtcodigo" class="form-control first-input" />
                  </div>
                  <div class="col-9">
                    <label for="txtnombre" class="form-label">Nombre</label>
                    <input type="text" id="txtnombre" name="txtnombre" class="form-control" required />
                  </div>
                </div>
                <div class="col-12">
                  <label for="txtdescripcion" class="form-label">Descripción</label>
                  <input type="text" id="txtdescripcion" name="txtdescripcion" class="form-control" />
                </div>
                <div class="row">
                  <div class="col-6">
                    <label for="cbocategoria" class="form-label">Categoría</label>
                    <select id="cbocategoria" name="cbocategoria" class="form-control"></select>
                  </div>
                  <div class="col-6">
                    <label for="cbomarca" class="form-label">Marca</label>
                    <select id="cbomarca" name="cbomarca" class="form-control"></select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <label for="txtprecio" class="form-label">Precio</label>
                    <input type="text" id="txtprecio" name="txtprecio" class="form-control money" required />
                  </div>
                  <div class="col-6">
                    <label for="txtstock" class="form-label">Stock</label>
                    <input type="text" id="txtstock" name="txtstock" class="form-control number" />
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="navs-top-2" role="tabpanel">
                <div class="input-group">
                  <input type="text" class="form-control rounded" name="txtcaracteristicanombre" id="txtcaracteristicanombre" placeholder="Característica">
                  <div class="input-group-append ms-1 w-50">
                    <input type="text" class="form-control" name="txtcaracteristicavalor" id="txtcaracteristicavalor" placeholder="Valor">
                  </div>
                  <div class="input-group-append ms-2">
                    <button type="button" class="btn btn-outline-info" name="btncaracteristicaagregar" id="btncaracteristicaagregar">
                      <i class="bx bx-plus"></i>
                    </button>
                  </div>
                </div>
                <table class="table table-sm table-bordered mt-2" id="caracTable">
                  <script type="handlebars-x" id="tpl_caracTable">
                    {{#this}}
                      <tr>
                        <td>{{nombre}}</td>
                        <td>{{valor}}</td>
                        <td align="right">
                          <i class="bx bx-trash"></i>
                        </td>
                      </tr>
                    {{/this}}
                  </script>
                </table>
              </div>
              <div class="tab-pane fade" id="navs-top-3" role="tabpanel">
                <table class="table table-sm mt-1">
                  <thead>
                    <tr>
                      <th>Criterio</th>
                      <th colspan="2">Opción</th>
                    </tr>
                  </thead>
                  <tbody id="tbodyCriterioopcion">
                    <script type="handlebars-x" id="tpl_criterioopcion">
                      {{#this}}
                        <tr id="{{id}}">
                          <td><small>{{nombre}}</small></td>
                          <td>
                            <select name="cbocriterioopcion" id="cbocriterioopcion{{@index}}" class="form-control form-control-sm control-criterio-opcion" disabled>
                              {{#criterioopcionList}}
                                <option value="{{id}}">{{descripcion}}</option>
                              {{/criterioopcionList}}
                            </select>
                          </td>
                          <td><input type="checkbox" name="chkcriterioopcion" id="chkcriterioopcion{{@index}}"></td>
                        </tr>
                      {{/this}}
                    </script>
                  </tbody>
                </table>
              </div>
              <div class="tab-pane fade" id="navs-top-4" role="tabpanel">
                <div class="col-12">
                  <button type="button" class="btn btn-link" id="dzClickable">[ Adjuntar imagen <i class="bx bxs-file-find"></i> ]</button>
                </div>
                <div class="col-12">
                  <div id="previews">
                    <div id="template" class="row mt-2">
                      <div class="col-auto">
                        <span class="preview"><img src="data:," alt="" data-dz-thumbnail /></span>
                      </div>
                      <div class="col-6">
                        <div>
                          <div>
                            <p class="mb-0">
                              <span class="lead" data-dz-name></span>
                              (<span data-dz-size></span>)
                            </p>
                            <strong class="error text-danger" data-dz-errormessage></strong>
                          </div>
                          <div class="progress progress-striped active w-100" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                            <div class="progress-bar progress-bar-success" style="width:0%;" data-dz-uploadprogress></div>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto d-flex align-items-center">
                        <div class="btn-group btn-group-sm">
                          <!-- <button class="btn btn-secondary start">
                                            <i class="bx bx-upload"></i>
                                        </button> -->
                          <!-- <button data-dz-remove class="btn btn-warning cancel">
                                            <i class="bx bx-times-circle"></i>
                                        </button> -->
                          <button data-dz-remove class="btn btn-danger delete">
                            <i class="bx bx-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</div>
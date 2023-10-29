<div class="modal fade" id="mdlMovimiento" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Nuevo</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="frmmovimiento">
        <input type="hidden" name="hddid" id="hddid" value="">
        <div class="modal-body">
          <div class="row">
            <div class="col-3">
              <label for="txtfecha" class="form-label">Fecha</label>
              <input type="text" id="txtfecha" name="txtfecha" class="form-control" value="<?= date('d-m-Y'); ?>" readonly required />
            </div>
            <div class="col-4">
              <label for="cbotipo" class="form-label">Tipo de operación</label>
              <select id="cbotipo" name="cbotipo" class="form-control first-input" required>
                <option value="1">INGRESO</option>
                <option value="2">SALIDA</option>
              </select>
            </div>
            <div class="col-5">
              <label for="txtcotizacion" class="form-label">Buscar cotización</label>
              <div class="input-group">
                <input type="text" id="txtcotizacion" name="txtcotizacion" class="form-control" />
                <span class="input-group-append">
                  <button type="button" class="btn btn-info" style="height: -webkit-fill-available; border-top-left-radius: 0; border-bottom-left-radius: 0;"><i class="bx bx-search"></i></button>
                </span>
              </div>
            </div>
          </div>
          <div class="col-12">
            <label for="txtdescripcion" class="form-label">Descripción</label>
            <input type="text" id="txtdescripcion" name="txtdescripcion" class="form-control" />
          </div>
          <div class="col-12">
            <label for="txtanexo" class="form-label">Cliente / Proveedor</label>
            <input type="text" id="txtanexo" name="txtanexo" class="form-control" />
          </div>
          <div class="col-12 d-none">
            <label for="cboestado" class="form-label">Estado</label>
            <select id="cboestado" name="cboestado" class="form-control" required></select>
          </div>
          <div class="col-12 mt-3">
            <p class="border-bottom fs-5 offcanvas-title">Buscar productos</p>
            <div class="input-group mt-2">
              <input type="text" name="txtbusproducto" id="txtbusproducto" class="form-control rounded" placeholder="Ingrese nombre...">
              <div class="input-group-append ms-1" style="width: 15%;">
                <input type="text" name="txtbuscantidad" id="txtbuscantidad" class="form-control text-end" placeholder="Cantidad">
              </div>
              <div class="input-group-append ms-1" style="width: 15%;">
                <input type="text" name="txtbusprecio" id="txtbusprecio" class="form-control text-end" placeholder="Precio">
              </div>
              <div class="input-group-append ms-1">
                <button type="button" class="btn btn-success" id="btnagregar"><i class="bx bx-plus"></i></button>
              </div>
            </div>
            <div class="mt-2">
              <table class="table table-sm">
                <tbody id="tbodyDetalle">
                  <script type="handlebars-x" id="tpl_detalle">
                    {{#this}}
                      <tr id="{{id}}">
                        <td>{{nombre}}</td>
                        <td align="right">{{cantidad}}</td>
                        <td align="right">{{precio}}</td>
                        <td align="center">
                          <i class="bx bx-trash cursor-pointer"></i>
                        </td>
                      </tr>
                    {{/this}}
                  </script>
                </tbody>
              </table>
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
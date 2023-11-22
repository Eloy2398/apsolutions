<div class="modal fade" id="mdlCotizacion" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Nuevo</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="frmcotizacion">
        <input type="hidden" name="hddid" id="hddid" value="">
        <div class="modal-body">
          <div class="row">
            <div class="col-3">
              <label for="txtfecha" class="form-label">Fecha</label>
              <input type="text" id="txtfecha" name="txtfecha" class="form-control" value="<?= date('d-m-Y'); ?>" readonly required />
            </div>
          </div>
          <div class="col-12">
            <label for="txtanexo" class="form-label">Cliente</label>
            <input type="text" id="txtanexo" name="txtanexo" class="form-control" />
          </div>
          <div class="col-12 mt-3">
            <p class="border-bottom fs-5 offcanvas-title">Buscar productos</p>
            <div class="input-group mt-2" id="div_busqueda_producto">
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
                      <tr id="{{idProducto}}">
                        <td>{{nombreProducto}}</td>
                        <td align="right">{{cantidad}}</td>
                        <td align="right">{{precio}}</td>
                        <td align="center">
                          {{#if_ idProducto '>' '0'}}
                            <td align="center">
                              <i class="bx bx-trash cursor-pointer"></i>
                            </td>
                          {{/if_}}
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
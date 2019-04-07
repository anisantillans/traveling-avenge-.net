using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TP_Complejidad.Logic;
using TP_Complejidad.Models;
using TP_Complejidad.ViewModel;

namespace TP_Complejidad.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            TPComplejidadEntities BD = new TPComplejidadEntities();
            var vm = new CentroPobladoViewModel();
            return View(vm);
        }
        [HttpPost]
        public ActionResult Index(CentroPobladoViewModel model)
        {
            var vm = new CentroPobladoViewModel();
            TPComplejidadEntities BD = new TPComplejidadEntities();
            vm.tipo = model.tipo;

            try
            {
                var lstCentroPoblado = BD.Centro_Poblado.Where( x => x.CAPITAL == model.tipo).ToList();
                Algoritmo alg = new Algoritmo(lstCentroPoblado);
                alg.RutaOptima();
                var lstIndices = alg.DevolverRutaOptima();
                
                vm.Fill(BD, lstIndices, lstCentroPoblado);
            }
            catch (Exception ex)
            {
                
            }
            
            return View(vm);
        }

        public JsonResult GetPueblo(String filtro)
        {
            TPComplejidadEntities BD = new TPComplejidadEntities();
            var data = BD.Centro_Poblado.Where(x => x.NOMCP.Contains(filtro)).OrderBy(x => x.NOMCP).Select(x => new { id = x.CODCP, text = x.NOMCP + "-" + x.DIST + "-" + x.PROV+ "-" + x.DEP, lat = x.XGD, lon = x.YGD }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetData(String Codigo)
        {
            TPComplejidadEntities BD = new TPComplejidadEntities();
            var data = BD.Centro_Poblado.FirstOrDefault(x=>x.CODCP == Codigo);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}
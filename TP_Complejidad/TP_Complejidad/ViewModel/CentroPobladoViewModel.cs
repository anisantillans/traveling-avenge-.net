using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TP_Complejidad.Models;


namespace TP_Complejidad.ViewModel
{
    public class Punto
    {
        public Decimal? X { get; set; }
        public Decimal? Y { get; set; }
    }
    public class CentroPobladoViewModel
    {
        public String Ubigeo { set; get; }
        public String tipo { get; set; }
        public List<Int32> LstIndice { get; set; } = new List<Int32>();
        public List<Punto> LstCentroPoblado { set; get; } = new List<Punto>();

        public void Fill(TPComplejidadEntities bd, List<Int32> lstIndice, List<Centro_Poblado> lstCentroPoblado)
        {
            this.LstIndice = lstIndice;

            foreach (var i in LstIndice)
            {
                LstCentroPoblado.Add(new Punto {
                    X = lstCentroPoblado[i].XGD,
                    Y = lstCentroPoblado[i].YGD
                });
            }
        } 
    }
}
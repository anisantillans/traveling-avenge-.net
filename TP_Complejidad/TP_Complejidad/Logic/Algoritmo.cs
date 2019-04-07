using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TP_Complejidad.Models;

namespace TP_Complejidad.Logic
{
    public class Algoritmo
    {
        public double[,] G;
        public int num_ciudades;
        public double[,] ruta;
        List<Centro_Poblado> listPoblados;

        public Algoritmo(List<Centro_Poblado> listaPoblados)
        {
            num_ciudades = listaPoblados.Count;
            G = new double[num_ciudades, num_ciudades];
            ruta = new double[num_ciudades + 1, 2];
            listPoblados = listaPoblados;
        }

        public void RutaOptima()
        {
            for (int i = 0; i < num_ciudades + 1; i++)
            {
                for (int j = 0; j < 2; j++)
                {
                    ruta[i, j] = 0;
                }
            }

            LlenarMatriz();
            BuscarRutaOptima();
        }

        public static float distancia(Centro_Poblado P1, Centro_Poblado P2)
        {
            int RadioTierraKm = 6378;
            var difLatitud = Convert.ToSingle(Math.PI / 180) * ((float)(P2.YGD - P1.YGD));
            var difLongitud = Convert.ToSingle(Math.PI / 180) * ((float)(P2.XGD - P1.XGD));

            var a = Math.Pow(Math.Sin(difLatitud / 2), 2) +
            Math.Cos(Convert.ToSingle(Math.PI / 180) * (float)(P1.YGD)) *
            Math.Cos(Convert.ToSingle(Math.PI / 180) * (float)(P2.YGD)) *
            Math.Pow(Math.Sin(difLongitud / 2), 2);
            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            return RadioTierraKm * Convert.ToSingle(c);
        }
        public void LlenarMatriz()
        {
            for (int i = 0; i < listPoblados.Count; i++)
            {
                for (int j = 0; j < listPoblados.Count; j++)
                {
                    G[i, j] = distancia(listPoblados[i], listPoblados[j]);
                }
            }
        }

        void BuscarRutaOptima()
        {
            int inicio, indice_del_menor = 0;
            inicio = 3;
            ruta[0, 0] = inicio;
            inicio--;

            for (int i = 0; i < num_ciudades; i++)
            {
                if (i == 0)
                {
                    indice_del_menor = BuscarEnFila(inicio);
                    QuitarCiudadesVisitadas(indice_del_menor, false);
                }
                else
                {
                    if (i == num_ciudades - 2)
                    {
                        indice_del_menor = BuscarEnFila(indice_del_menor);
                        QuitarCiudadesVisitadas(indice_del_menor, true);
                    }
                    else
                    {
                        indice_del_menor = BuscarEnFila(indice_del_menor);
                        QuitarCiudadesVisitadas(indice_del_menor, false);
                    }
                }
            }
        }

        int BuscarEnFila(int inicio)
        {
            double menor = 999999;
            int indice_del_menor = 0;
            for (int i = 0; i < num_ciudades; i++)
            {
                if (G[inicio, i] != 0)
                {
                    if (G[inicio, i] < menor)
                    {
                        menor = G[inicio, i];
                        indice_del_menor = i;
                    }
                }
            }

            GuardarCiudad(indice_del_menor);
            GuardarValor(menor);
            return indice_del_menor;
        }

        void GuardarCiudad(int indice_del_menor)
        {
            int num_ciudades_visitadas = 0;
            for (int i = 0; i < num_ciudades; i++)
            {
                if (ruta[i, 0] != 0)
                {
                    num_ciudades_visitadas++;
                }
            }
            ruta[num_ciudades_visitadas, 0] = indice_del_menor + 1;
        }

        void GuardarValor(double menor)
        {
            int i, num_ciudades_visitadas;

            i = 0;
            num_ciudades_visitadas = 0;

            while (ruta[i,1] != 0)
            {
                i++;
                num_ciudades_visitadas++;
            }

            ruta[num_ciudades_visitadas,1] = menor;
        }

        void QuitarCiudadesVisitadas(int indice_del_menor, bool penultimo)
        {
            int i = 0, num_ciudades_visitadas = 0;
            double aux;
            while (ruta[i, 1] != 0)
            {
                i++;
                num_ciudades_visitadas++;
            }

            if (penultimo == true)
            {
                for (i = num_ciudades_visitadas; i >= 1; i--)
                {
                    aux = ruta[i, 0];
                    aux = aux - 1;
                    G[indice_del_menor, (Int32)aux] = 0;
                }
            }
            else
            {
                for (i = num_ciudades_visitadas; i >= 0; i--)
                {
                    aux = ruta[i, 0];
                    aux = aux - 1;
                    G[indice_del_menor, (Int32)aux] = 0;
                }
            }
        }

        public List<Int32> DevolverRutaOptima()
        {
            List<Int32> lstPosicion = new List<Int32>();
            for (int i = 0; i < num_ciudades + 1; i++)
            {
                lstPosicion.Add(((Int32)ruta[i, 0]) - 1);
            }
            return lstPosicion;
        }
    }
}
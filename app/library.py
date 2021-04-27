from app.database.db_handles import libquery, nOflibs
from flask import Flask, render_template, request, redirect, Blueprint
import datetime

library = Blueprint('library', __name__)

@library.route('/library', methods=["GET", "POST"])
def library():
    if request.method == "POST":
        postcodevar  = request.forms['postcode']
        Entryid = nOflibs(postcodevar)
        return render_template(
            "library/library.html",
            dataisentered=True ,
            Entryid=Entryid ,
            postcode = postcodevar,
            BranchName         =  libquery(postcodevar,'BranchName'         ),
            WiFiAvailability   =  libquery(postcodevar,'WiFiAvailability'   ),
            AddressLine1       =  libquery(postcodevar,'AddressLine1'       ),
            Postcode           =  libquery(postcodevar,'Postcode'           ),
            Contact            =  libquery(postcodevar,'Contact'            ),
            BranchManagerName  =  libquery(postcodevar,'BranchManagerName'  ),
            BranchManagerEmail =  libquery(postcodevar,'BranchManagerEmail' ),
            Phone              =  libquery(postcodevar,'Phone'              ),
            Monday             =  libquery(postcodevar,'Monday'             ),
            Tuesday            =  libquery(postcodevar,'Tuesday'            ),
            Wednesday          =  libquery(postcodevar,'Wednesday'          ),
            Thursday           =  libquery(postcodevar,'Thursday'           ),
            Friday             =  libquery(postcodevar,'Friday'             ),
            Saturday           =  libquery(postcodevar,'Saturday'           ),
            Sunday             =  libquery(postcodevar,'Sunday'             ),
            )
    else:
        return render_template("library/library.html",dataisentered=False)
